import {
    Resolver,
    Query,
    Ctx,
    Arg,
    Mutation,
    InputType,
    Field,
    UseMiddleware,
    Int,
    FieldResolver,
    Root, ObjectType,
} from "type-graphql";
import {Post} from "../entities/Post";
import {MyContext} from "src/types";
import {isAuth} from "../middleware/isAuth";
import {getConnection} from "typeorm";

@InputType()
class PostInput {
    @Field()
    title: string;
    @Field()
    text: string;
}

@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts: Post[]
    @Field()
    hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => String)
    textSnippet(@Root() root: Post) {
        return root.text.slice(0, 50)
    }

    @Query(() => PaginatedPosts)
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
    ): Promise<PaginatedPosts> {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const qb = getConnection()
            .getRepository(Post)
            .createQueryBuilder("p")
            .orderBy('"createdAt"', 'DESC')
            .take(realLimitPlusOne);

        if (cursor) {
            qb.where('"createdAt" < :cursor', {cursor: new Date(parseInt(cursor))})
        }

        const posts = await qb.getMany()

        return {
            posts: posts.slice(0, realLimit),
            hasMore: posts.length === realLimitPlusOne
        };
    }

    // list item
    @Query(() => Post, {nullable: true})
    post(@Arg("id") id: number): Promise<Post | undefined> {
        return Post.findOne(id);
    }

    // create
    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() {req}: MyContext
    ): Promise<Post> {
        return Post.create({
            ...input,
            creatorId: req.session.userId,
        }).save();
    }

    // update
    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String, {nullable: true}) title: string
    ): Promise<Post | null> {
        const post = await Post.findOne(id);

        if (!post) {
            return null;
        }

        if (typeof title !== "undefined") {
            await Post.update({id}, {title});
        }

        return post;
    }

    // delete
    @Mutation(() => Boolean)
    async deletePost(@Arg("id") id: number): Promise<Boolean> {
        await Post.delete(id);
        return true;
    }
}
