import {
  dedupExchange, fetchExchange, Exchange, stringifyVariables,
} from 'urql';
import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
import { pipe, tap } from 'wonka';
import Router from 'next/router';
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

const errorExchange: Exchange = ({ forward }) => (ops$) => pipe(
  forward(ops$),
  tap(({ error }) => {
    if (error?.message.includes('not authenticated')) {
      Router.replace('/login');
    }
  }),
);

const cursorPagination = (): Resolver => (_parent, fieldArgs, cache, info) => {
  const { parentKey: entityKey, fieldName } = info;

  const allFields = cache.inspectFields(entityKey);
  const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
  const size = fieldInfos.length;
  if (size === 0) {
    return undefined;
  }

  const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
  const isItInTheCache = cache.resolve(cache.resolve(entityKey, fieldKey) as string, 'posts');
  info.partial = !!isItInTheCache;
  const results: string[] = [];
  let hasMore = true;

  fieldInfos.forEach((fi) => {
    const key = cache.resolve(entityKey, fi.fieldKey) as string;
    const data = cache.resolve(key, 'posts');
    const isMore = cache.resolve(key, 'hasMore');

    if (!isMore) {
      hasMore = isMore as boolean;
    }

    results.push(...data);
  });

  return {
    __typename: 'PaginatedPosts',
    hasMore,
    posts: results,
  };
};

export const createUrqlClient = (ssrExchange) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      kets: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          // posts: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, _, cache) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null }),
            );
          },
          login: (_result, _, cache) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                }
                return {
                  me: result.login.user,
                };
              },
            );
          },
          register: (_result, _, cache) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                }
                return {
                  me: result.register.user,
                };
              },
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
