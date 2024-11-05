import { checkUser } from "@/lib/CheckUser"
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs"

const Header =async () => {
    const user = await checkUser();
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <h2>Expensico</h2>
            <div>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </div>
    </nav>
  )
}

export default Header