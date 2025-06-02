import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Login from '../components/Login';
// import Registro from '../components/Registro';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Alterar from '../pages/Alterar';
// import Perfil from '../components/Perfil';

const Stack = createNativeStackNavigator();

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                    animation: 'slide_from_right'
                }}
            >
                {/* <Stack.Screen name="Login" component={Login} /> */}
                {/* <Stack.Screen name="Registro" component={Registro} /> */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Alterar" component={Alterar} />
                {/* <Stack.Screen name="Perfil" component={Perfil} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}