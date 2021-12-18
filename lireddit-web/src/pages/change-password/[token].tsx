import { useState, FC, PropsWithChildren } from 'react';
import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import {
  Button, Box, Link, Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { withUrqlClient, WithUrqlProps } from 'next-urql';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import InputField from '../../components/InputField';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword: NextPage = function () {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={ { newPassword: '' } }
        onSubmit={ async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
                            typeof router.query.token === 'string' ? router.query.token : '',
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push('/');
          }
        } }
      >
        { ({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            { tokenError ? (
              <Flex>
                <Box mr={ 2 } style={ { color: 'red' } }>
                  { tokenError }
                </Box>
                <Link href="/forgot-password">go forget it again</Link>
              </Flex>
            ) : null }

            <Button
              mt={ 4 }
              type="submit"
              isLoading={ isSubmitting }
              colorScheme="teal"
            >
              change password
            </Button>
          </Form>
        ) }
      </Formik>
    </Wrapper>
  );
};

// 06:30
// ChangePassword.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string,
//   };
// };

export default withUrqlClient(createUrqlClient)(
    ChangePassword as FC<PropsWithChildren<WithUrqlProps | { token: string }>>,
);
