import { useUser } from "@clerk/clerk-expo";
import { Alert, FlatList, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader.jsx";
import { styles } from "../../assets/styles/home.styles.js";
import { SignOutButton } from "../../components/SignOutButton.jsx";
import { BalanceCard } from "../../components/BalanceCard.jsx";
import { TransactionItem } from "../../components/TransactionItem.jsx";
import NoTransactionsFound from "../../components/NoTransactionsFound.jsx";

export default function Page() {
    const { user } = useUser();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user.id);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleDelete = (id) => {
        Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    deleteTransaction(id);
                    onRefresh();
                },
            },
        ]);
    };

    if (isLoading && !refreshing) return <PageLoader text={"Fetching your transactions"} />;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* HEADER */}
                <View style={styles.header}>
                    {/*Left hand side*/}
                    <View style={styles.headerLeft}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome,</Text>
                            <View style={{ height: 24, overflow: "hidden", maxWidth: "90%" }}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                                    <Text style={styles.usernameText}>
                                        {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    {/*Right hand side*/}
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
                            <Ionicons name="add-circle" size={20} color="#FFF" />
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                        <SignOutButton />
                    </View>
                </View>

                {/* BALANCE CARD (SUMMARY) */}
                <BalanceCard summary={summary} />

                <View style={styles.transactionsHeaderContainer}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <Text style={styles.subtext}>(pull down to refresh)</Text>
                </View>
            </View>

            {/* FlatList is a performant way to render long lists in React Native. */}
            {/* it renders items lazily — only those on the screen. */}
            <FlatList
                style={styles.transactionsList}
                contentContainerStyle={styles.transactionsListContent}
                data={JSON.parse(transactions)}
                renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
                ListEmptyComponent={<NoTransactionsFound />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    );
}
