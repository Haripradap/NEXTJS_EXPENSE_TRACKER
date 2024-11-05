import { SignInButton } from "@clerk/nextjs"

const Guest = () => {
  return (
    <div className="guest">
        <h1>Welcome</h1>
        <p>Please SignIn to manage your Expensico</p>
        <SignInButton/>
    </div>
  )
}

export default Guest