// Components

interface AuthFormProps {
  children: any;
  heading?: string;
  submit: any;
}

const AuthForm = ({ children, heading, submit }: AuthFormProps) => {
  return (
    <form
      className="shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] w-[480px] min-w-[480px] rounded-md px-16 py-8 animate-scale bg-white select-none"
      onSubmit={submit}
      data-testid="form"
    >
      {heading ? (
        <div className="mb-8 mt-3 text-center">
          <h1>{heading}</h1>
        </div>
      ) : (
        ""
      )}

      {children}
    </form>
  );
};

export default AuthForm;
