import SignInWithButton from "@/components/SignInWithButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="w-full h-full absolute top-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('/bg.png')` }}
      >
        <div className="w-full h-full absolute top-0 bg-overlay ">
          <div className="px-[200px] h-full flex justify-between">
            <div className="flex items-center max-w-[380px]">
              <div className="flex flex-col gap-20">
                <img src="/logo.png" alt="logo" width={273} height={64} />
                <div className="flex flex-col gap-6">
                  <h2 className="h2-text text-white font-bold font-zen">
                    Building the Future...
                  </h2>
                  <p className="text-white text-base font-normal text-base-leading font-zen">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[460px] flex flex-col justify-end">
              <Card className="rounded-t-3xl bg-[#FAFAFA] rounded-b-none">
                <CardHeader className="gap-0">
                  <CardDescription className="text-sm font-medium text-black">
                    WELCOME BACK!
                  </CardDescription>
                  <CardTitle className="font-semibold text-2xl text-black">
                    Log In to your Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <form className="space-y-3">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-[#4F4F4F] font-normal text-xs"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Type here..."
                          required
                          className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="password"
                          className="text-[#4F4F4F] font-normal text-xs"
                        >
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Type here..."
                          required
                          className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            className="data-[state=checked]:bg-[#EE3425] data-[state=checked]:border-[#EE3425]"
                          />
                          <Label
                            htmlFor="remember"
                            className="text-xs cursor-pointer"
                          >
                            Remember me
                          </Label>
                        </div>
                        <div className="text-[#424242] font-medium text-xs cursor-pointer">
                          Forgot Password?
                        </div>
                      </div>
                      <Button className="w-full bg-[#EE3425] text-white text-base font-bold h-12 hover:bg-[#EE3425] cursor-pointer">
                        Log In
                      </Button>
                    </form>
                    <div className="flex justify-between items-center gap-2">
                      <div className="bg-[#E0E0E0] h-px w-full" />
                      <div className="text-[#212121] text-[13px] font-bold">
                        Or
                      </div>
                      <div className="bg-[#E0E0E0] h-px w-full" />
                    </div>
                    <div className="space-y-2.5">
                      <SignInWithButton
                        image="/google.png"
                        altText="google icon"
                        text="Log In with Google"
                      />
                      <SignInWithButton
                        image="/facebook.png"
                        altText="facebook icon"
                        text="Log In with Facebook"
                      />
                      <SignInWithButton
                        image="/apple.png"
                        altText="apple icon"
                        text="Log In with Apple"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <div className="text-xs text-black font-normal text-center w-full">
                    New User?{" "}
                    <span className="font-bold cursor-pointer">
                      SIGN UP HERE
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
