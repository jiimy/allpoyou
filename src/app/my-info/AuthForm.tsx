'use client';

import React, { useActionState, useState } from 'react';
import classNames from 'classnames';

import {
  signup,
  login,
  lookupSecurityQuestion,
  resetPassword,
  type AuthState,
  type ResetState,
} from './actions';
import { SECURITY_QUESTION } from './constants';
import s from './myInfo.module.scss';
import GoogleLoginButton from '@/components/loginButton/GoogleLoginButton';

type Mode = 'login' | 'signup' | 'reset';

const LoginForm = () => {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    login,
    undefined,
  );

  return (
    <form className={s.form} action={action}>
      <div className={s.field}>
        <label className={s.label} htmlFor="login-user_id">
          아이디
        </label>
        <input
          className={s.input}
          id="login-user_id"
          name="user_id"
          autoComplete="user_id"
          placeholder="아이디"
        />
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="login-password">
          비밀번호
        </label>
        <input
          className={s.input}
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
        />
      </div>
      {state?.error && <p className={s.formError}>{state.error}</p>}
      <button className={s.submit} type="submit" disabled={pending}>
        {pending ? '로그인 중...' : '로그인'}
      </button>
      <div className={s.divider}>
        <span>또는</span>
      </div>
      <GoogleLoginButton />
    </form>
  );
};

const SignupForm = () => {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signup,
    undefined,
  );
  const fe = state?.fieldErrors;

  return (
    <form className={s.form} action={action}>
      <div className={s.field}>
        <label className={s.label} htmlFor="signup-user_id">
          아이디 (닉네임)
        </label>
        <input
          className={s.input}
          id="signup-user_id"
          name="user_id"
          autoComplete="user_id"
          placeholder="2~20자"
        />
        {fe?.user_id && <p className={s.fieldError}>{fe.user_id}</p>}
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="signup-password">
          비밀번호
        </label>
        <input
          className={s.input}
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="6자 이상"
        />
        {fe?.password && <p className={s.fieldError}>{fe.password}</p>}
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="signup-password-confirm">
          비밀번호 확인
        </label>
        <input
          className={s.input}
          id="signup-password-confirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호 다시 입력"
        />
        {fe?.passwordConfirm && (
          <p className={s.fieldError}>{fe.passwordConfirm}</p>
        )}
      </div>
      <div className={s.field}>
        <label className={s.label}>비밀번호 찾기 질문</label>
        <p className={s.hint}>{SECURITY_QUESTION}</p>
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="signup-answer">
          질문의 답변
        </label>
        <input
          className={s.input}
          id="signup-answer"
          name="securityAnswer"
          placeholder="답변"
        />
        <p className={s.hint}>비밀번호를 잊었을 때 본인 확인에 사용됩니다.</p>
        {fe?.securityAnswer && (
          <p className={s.fieldError}>{fe.securityAnswer}</p>
        )}
      </div>
      {state?.error && <p className={s.formError}>{state.error}</p>}
      <button className={s.submit} type="submit" disabled={pending}>
        {pending ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
};

const ResetForm = ({ onDone }: { onDone: () => void }) => {
  const [lookupState, lookupAction, lookupPending] = useActionState<
    ResetState,
    FormData
  >(lookupSecurityQuestion, undefined);
  const [resetState, resetAction, resetPending] = useActionState<
    ResetState,
    FormData
  >(resetPassword, undefined);

  const [user_id, setUser_id] = useState('');

  const question = resetState?.question ?? lookupState?.question;
  const isResetStep =
    lookupState?.step === 'reset' || resetState?.step === 'reset';

  if (resetState?.message) {
    return (
      <div className={s.form}>
        <p className={s.formMessage}>{resetState.message}</p>
        <button className={s.submit} type="button" onClick={onDone}>
          로그인하러 가기
        </button>
      </div>
    );
  }

  if (isResetStep && question) {
    return (
      <form className={s.form} action={resetAction}>
        <input type="hidden" name="user_id" value={user_id ?? ''} />
        <input type="hidden" name="question" value={question} />
        <div className={s.field}>
          <label className={s.label}>보안 질문</label>
          <p className={s.hint}>{question}</p>
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="reset-answer">
            답변
          </label>
          <input
            className={s.input}
            id="reset-answer"
            name="securityAnswer"
            placeholder="가입 시 입력한 답변"
          />
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="reset-new-password">
            새 비밀번호
          </label>
          <input
            className={s.input}
          id="reset-new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          placeholder="6자 이상"
        />
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="reset-new-password-confirm">
            새 비밀번호 확인
          </label>
          <input
            className={s.input}
            id="reset-new-password-confirm"
            name="newPasswordConfirm"
            type="password"
            autoComplete="new-password"
            placeholder="새 비밀번호 다시 입력"
          />
        </div>
        {resetState?.error && <p className={s.formError}>{resetState.error}</p>}
        <button className={s.submit} type="submit" disabled={resetPending}>
          {resetPending ? '변경 중...' : '비밀번호 변경'}
        </button>
      </form>
    );
  }

  return (
    <form className={s.form} action={lookupAction}>
      <div className={s.field}>
        <label className={s.label} htmlFor="reset-user_id">
          아이디
        </label>
        <input
          className={s.input}
          id="reset-user_id"
          name="user_id"
          autoComplete="user_id"
          placeholder="가입한 아이디"
          value={user_id ?? ''}
          onChange={(e) => setUser_id(e.target.value)}
        />
      </div>
      {lookupState?.error && <p className={s.formError}>{lookupState.error}</p>}
      <button className={s.submit} type="submit" disabled={lookupPending}>
        {lookupPending ? '조회 중...' : '보안 질문 불러오기'}
      </button>
    </form>
  );
};

const AuthForm = () => {
  const [mode, setMode] = useState<Mode>('login');

  return (
    <div className={s.card}>
      <div className={s.tabs}>
        <button
          type="button"
          className={classNames(s.tab, { [s.active]: mode === 'login' })}
          onClick={() => setMode('login')}
        >
          로그인
        </button>
        <button
          type="button"
          className={classNames(s.tab, { [s.active]: mode === 'signup' })}
          onClick={() => setMode('signup')}
        >
          회원가입
        </button>
        <button
          type="button"
          className={classNames(s.tab, { [s.active]: mode === 'reset' })}
          onClick={() => setMode('reset')}
        >
          비밀번호 찾기
        </button>
      </div>

      {mode === 'login' && <LoginForm />}
      {mode === 'signup' && <SignupForm />}
      {mode === 'reset' && <ResetForm onDone={() => setMode('login')} />}
    </div>
  );
};

export default AuthForm;
