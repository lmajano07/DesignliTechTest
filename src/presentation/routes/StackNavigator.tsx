import { createStackNavigator } from "@react-navigation/stack";

import StockPage from '@src/presentation/pages/Stock/StockPage';
import AlertPage from '@src/presentation/pages/Alert/AlertPage';
import WatchlistPage from '@src/presentation/pages/Watchlist/WatchlistPage';

export type RootStackParams = {
    Alert: undefined;
    Watchlist: undefined;
    Stocks: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigation = () => {
 return (
        <Stack.Navigator initialRouteName="Stocks"
            screenOptions={{
                headerTitleAlign: 'center',                
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerShadowVisible: false,
                headerTitle: '',
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <Stack.Screen name="Alert" component={AlertPage} />
            <Stack.Screen name="Watchlist" component={WatchlistPage} />
            <Stack.Screen name="Stocks" component={StockPage} />
        </Stack.Navigator>
    );
}

export default StackNavigation;