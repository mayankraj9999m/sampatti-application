import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useAuthStyles from "../../assets/styles/auth.styles.js";
import useTheme from "../../hooks/useTheme";

export default function SignUpScreen() {
    const { themeColors: COLORS } = useTheme();
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const styles = useAuthStyles();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded || isLoading) return;
        setIsLoading(true);

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress,
                password,
            });

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true);
            setError("");
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            // console.error(JSON.stringify(err, null, 2));
            if (err?.errors?.[0].code === "too_many_requests") {
                setError(`${err.errors?.[0]?.message}\nRetry after ${err?.retryAfter}s.`);
            } else {
                setError(err.errors?.[0]?.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded || isLoading) return;
        setIsLoading(true);

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            });

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                setError("");
                router.replace("/");
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            // console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (pendingVerification) {
        return (
            <View style={styles.verificationContainer}>
                <Text style={styles.verificationTitle}>Verify your email</Text>
                <Text style={styles.verificationDescription}>{`Check your inbox ${emailAddress}`}</Text>
                {error ? (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle" size={20} color={COLORS.expense} />

                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={() => setError("")}>
                            <Ionicons name="close" size={20} color={COLORS.textLight} />
                        </TouchableOpacity>
                    </View>
                ) : null}
                <TextInput
                    style={[styles.verificationInput, error && styles.errorInput]}
                    value={code}
                    placeholder="Enter your verification code"
                    onChangeText={(code) => setCode(code)}
                />
                <TouchableOpacity
                    onPress={onVerifyPress}
                    style={[styles.button, isLoading && { opacity: 0.5 }]}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>{isLoading ? "Verifying..." : "Verify"}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            // extraScrollHeight={100}
        >
            <View style={styles.container}>
                <Image source={require("../../assets/images/revenue-i2.png")} style={styles.illustration} />
                <Text style={styles.title}>Create Account</Text>
                {error ? (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle" size={20} color={COLORS.expense} />

                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={() => setError("")}>
                            <Ionicons name="close" size={20} color={COLORS.textLight} />
                        </TouchableOpacity>
                    </View>
                ) : null}

                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    onChangeText={(email) => setEmailAddress(email)}
                />
                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <TouchableOpacity
                    onPress={onSignUpPress}
                    style={[styles.button, isLoading && { opacity: 0.5 }]}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Already have an account ?</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.linkText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}
