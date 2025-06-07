import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Perfil from './Perfil';
import Login from './Login';
import Registro from './Registro';
import Home from './Home';
import Cadastro from './Cadastro';
import Alterar from './Alterar';


const Stack = createNativeStackNavigator();

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                    animation: 'slide_from_right'
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Alterar" component={Alterar} />
                <Stack.Screen name="Perfil" component={Perfil} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}