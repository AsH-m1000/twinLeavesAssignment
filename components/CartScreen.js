import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const CartScreen = ({cartItems, navigation}) => {
  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 24, marginBottom: 20}}>Cart Items</Text>
      {cartItems.map(item => (
        <View
          key={item.index}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: item.imageUrl}}
            style={{width: 50, height: 50, marginRight: 10}}
          />
          <Text>
            {item.name} - Quantity: {item.quantity}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
