import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  BackHandler, // Import BackHandler
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const ProductsListingScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=1',
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data.products)) {
          const updatedProducts = data.products.map((product, index) => ({
            ...product,
            quantity: 0,
            imageUrl: 'https://picsum.photos/200',
            index: index,
          }));
          setProducts(updatedProducts);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Prevent navigation back when the user lands on this screen
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; // Return true to prevent back navigation
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        backHandler.remove(); // Clean up the event listener when the component unmounts
      };
    }, []),
  );

  const addToCart = index => {
    const productToAdd = products.find(product => product.index === index);
    const existingCartItem = cart.find(item => item.index === index);

    if (existingCartItem) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.index === index ? {...item, quantity: item.quantity + 1} : item,
        ),
      );
    } else {
      setCart(prevCart => [...prevCart, {...productToAdd, quantity: 1}]);
    }

    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.index === index
          ? {...product, quantity: product.quantity + 1}
          : product,
      ),
    );
  };

  const removeFromCart = index => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.index === index && product.quantity > 0
          ? {...product, quantity: product.quantity - 1}
          : product,
      ),
    );

    const existingCartItem = cart.find(item => item.index === index);
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        setCart(prevCart =>
          prevCart.map(item =>
            item.index === index
              ? {...item, quantity: item.quantity - 1}
              : item,
          ),
        );
      } else {
        const newCart = cart.filter(item => item.index !== index);
        setCart(newCart);
      }
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 24, marginBottom: 20}}>Products Listing</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {products.map(product => (
              <View
                key={product.index}
                style={{width: '50%', marginBottom: 20}}>
                <View style={{position: 'relative', margin: 10}}>
                  <Image
                    source={{uri: product.imageUrl}}
                    style={{width: '100%', aspectRatio: 1, marginRight: 10}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}>
                    <TouchableOpacity onPress={() => addToCart(product.index)}>
                      <Text
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          padding: 5,
                          fontSize: 25,
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'orange',
                        fontSize: 25,
                      }}>
                      {product.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeFromCart(product.index)}>
                      <Text
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          padding: 5,
                          fontSize: 25,
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>{product.name.substring(0, 20)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={toggleModal}>
        <Text style={{color: 'white'}}>View Cart</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 24, marginBottom: 20}}>Cart Items</Text>
            {cart.map(item => (
              <View
                key={item.index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{width: 50, height: 50, marginRight: 10}}
                />
                <Text>
                  {item.name.substring(0, 20)} - Quantity: {item.quantity}
                </Text>
              </View>
            ))}
            <TouchableOpacity style={{marginTop: 20}} onPress={toggleModal}>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
});

export default ProductsListingScreen;
