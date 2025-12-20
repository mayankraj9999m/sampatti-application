import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors.js";

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded || isLoading) return;
        setIsLoading(true);

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/");
            } else if (signInAttempt.status === "needs_second_factor") {
                // Two-factor authentication is required
                // Prepare the second factor verification (email code)
                await signInAttempt.prepareSecondFactor({
                    strategy: "email_code",
                });
                setPendingVerification(true);
                setError("");
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            if (err?.errors?.[0].code === "too_many_requests") {
                setError(`${err.errors?.[0]?.message}\nRetry after ${err?.retryAfter}s.`);
            } else {
                setError(err.errors?.[0]?.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle the verification of the second factor
    const onVerifyPress = async () => {
        if (!isLoaded || isLoading) return;
        setIsLoading(true);

        try {
            const signInAttempt = await signIn.attemptSecondFactor({
                strategy: "email_code",
                code,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/");
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            setError(err.errors?.[0]?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            // extraScrollHeight={100}
        >
            <View style={styles.container}>
                <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration} />
                <Text style={styles.title}>{pendingVerification ? "Verify Your Identity" : "Welcome Back"}</Text>
                {error ? (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={() => setError("")}>
                            <Ionicons name="close" size={20} color={COLORS.textLight} />
                        </TouchableOpacity>
                    </View>
                ) : null}

                {!pendingVerification ? (
                    <>
                        <TextInput
                            style={[styles.input, error && styles.errorInput]}
                            autoCapitalize="none"
                            value={emailAddress}
                            placeholder="Enter email"
                            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                        />
                        <TextInput
                            style={[styles.input, error && styles.errorInput]}
                            value={password}
                            placeholder="Enter password"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />

                        <TouchableOpacity onPress={onSignInPress} style={[styles.button, isLoading && { opacity: 0.5 }]} disabled={isLoading}>
                            <Text style={styles.buttonText}>{isLoading ? "Signing In..." : "Sign In"}</Text>
                        </TouchableOpacity>

                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Don&apos;t have an account ?</Text>
                            <Link href="/sign-up" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.linkText}>Sign Up</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.footerText}>
                            We sent a verification code to your email. Please enter it below.
                        </Text>
                        <TextInput
                            style={[styles.input, error && styles.errorInput]}
                            value={code}
                            placeholder="Enter verification code"
                            keyboardType="number-pad"
                            onChangeText={(code) => setCode(code)}
                        />

                        <TouchableOpacity onPress={onVerifyPress} style={[styles.button, isLoading && { opacity: 0.5 }]} disabled={isLoading}>
                            <Text style={styles.buttonText}>{isLoading ? "Verifying..." : "Verify"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPendingVerification(false)} style={styles.backButton}>
                            <Text style={styles.linkText}>Back to Sign In</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </KeyboardAwareScrollView>
    );
}
