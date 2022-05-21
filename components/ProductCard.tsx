import React from 'react';

import {
    View,
    Dimensions,
    StyleSheet,
    Image} from 'react-native';
import { Product } from '../typings';
import { Text } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
const { height, width } = Dimensions.get('screen');

interface ProductCardProps {
    productDetail: Product;
}
const ProductCard = (props: ProductCardProps) => {
    const colorScheme = useColorScheme();
    const {
        productDetail,
    } = props;

    const {
        group,
        id,
        name,
        description,
        image,
        deductibleCredit,
        actualPrice,
        offerPrice,
        condition,
    } = productDetail;

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', height: 'auto' }}>
                <View style={{ flexDirection: 'row', height: '100%' }}>
                    <View style={{ width: '70%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text
                                style={{
                                    color: Colors.black,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                }}>
                                {name}
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: Colors.black,
                                fontSize: 16,
                            }}>
                            Condition - {condition}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}>
                            Original Price - EUR {actualPrice}
                        </Text>
                        <Text
                            style={{
                                color: Colors.primary,
                                fontSize: 16,
                            }}>
                            Offered Price  - EUR {offerPrice}
                        </Text>
                        <Text
                            style={{
                                color: Colors.primary,
                                fontSize: 16,
                            }}>
                            Deducible Credits  - {deductibleCredit} pts
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}>
                            {description}
                        </Text>
                    </View>
                    <View style={{ width: '30%' }}>
                        <Image
                            style={{ width: '100%', minHeight: 120, marginBottom: 5 }}
                            source={{
                                uri: image,
                            }}
                            resizeMode="stretch"
                        />
                    </View>
                </View>
            </View>
        </View>
    )
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        borderRadius: 8,
        marginVertical: height * 0.01,
        borderColor: Colors.primary,
        borderWidth: 2,
        width: width * 0.95,
        padding: width * 0.02,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: width * 0.01,
        justifyContent: 'space-between',
    },
    button: {
        width: '45%',
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.dangerColor,
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.94,
        height: height * 0.8,
        justifyContent: 'space-around',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    submitButton: {
        width: '100%',
        marginVertical: height * 0.01,
        padding: 8,
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    closeButtonText: {
        color: Colors.white,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
    },

    statusMessage: {
        paddingVertical: width * 0.01,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.02,
        alignSelf: 'flex-end',
    }
});
