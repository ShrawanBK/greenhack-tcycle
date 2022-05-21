import { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Product } from '../typings';

import Colors from '../constants/Colors';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';

const { width, height } = Dimensions.get('window');

export default function ProductsScreen() {
    const [products, setProducts] = useState<Product[]>();
    const [refreshing, setRefreshing] = useState(false);

    const getProducts = useCallback(() => {
        setRefreshing(true);
        setProducts(productsData);
        setRefreshing(false);
    }, []);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <View style={styles.container}>
            <Text
                style={{
                    color: Colors.primary,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: '600',
                    width: '70%'
                }}>
                Use your credits to get special offers on these products
            </Text>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <ProductCard
                        productDetail={item}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getProducts}
                    />
                }
                ListEmptyComponent={<Text>No booking made yet</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '100%',
    },
    refreshButton: {
        width: '45%',
        marginVertical: height * 0.01,
        borderRadius: width * 0.02,
        borderColor: Colors.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
    },
});
