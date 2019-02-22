import React from 'react';
import {WebView} from 'react-native';

// so exibir so renderizar, logo pode ser 
// uma variavel
// nunca havera state

// acessando valores no render
const Product = ( {navigation} ) => (
    <WebView source={
        { uri: navigation.state.params.product.url }
    }/>
);

// acessando os valores no header
Product.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.product.title,
});

export default Product;