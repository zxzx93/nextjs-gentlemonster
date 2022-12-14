import React, { useState } from 'react';
import * as yup from 'yup';

import CustomerForm from '../../components/CustomerForm';
import { LoginInputsForm } from '../../typings';
import Layout from '../../components/Layout';

const schema: yup.SchemaOf<LoginInputsForm> = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  // .test('domainCheck', 'gmail만 가능합니다.', email => {
  // 	if (!email) return false;
  // 	return email.split('@')[1] === 'gmail.com';
  // })
  password: yup
    .string()
    .required('영문, 숫자포함 8자리를 입력해주세요.')
    .min(8, '최소 8자 이상 가능합니다.')
    .max(15, '최대 15자 까지만 가능합니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
      '영문 숫자포함 8자리를 입력해주세요.'
    ),
});

function Login() {
  const [loginForm, setLoginForm] = useState<LoginInputsForm>({
    email: '',
    password: '',
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <div className='mt-5 h-screen h-full px-4 font-title text-gray-800'>
        <div className='mb-36 inline-flex w-full flex-col flex-wrap items-center justify-center sm:mt-24 lg:justify-between xl:justify-center'>
          <CustomerForm
            title='로그인'
            buttonTitle={['로그인', '구글 로그인', '카카오 로그인']}
            schema={schema}
            // loginForm={loginForm}
            handleFieldChange={handleFieldChange}
          />
          <CustomerForm title='회원가입' buttonTitle={['신규가입']} />
        </div>
      </div>
    </Layout>
  );
}

export default Login;
