import type { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Sign In | Sacrament Meeting Planner',
  description: 'Sign in to manage sacrament meetings.',
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <LoginForm />
    </section>
  );
}