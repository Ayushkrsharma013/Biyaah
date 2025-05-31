import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../utils/ThemePolishHelper';

const plans = [
  { id: 'basic', title: '1 Month', price: '₹199', features: ['5 messages/day', 'See 20 profiles'] },
  { id: 'standard', title: '3 Months', price: '₹499', features: ['Unlimited chat', 'See 100+ profiles', 'Priority support'] },
  { id: 'premium', title: '1 Year', price: '₹1299', features: ['Everything in Standard', 'Personal matchmaking support', 'Boosted profile visibility'] },
];

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string>('standard');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Upgrade to Premium</Text>

      {plans.map(plan => (
        <TouchableOpacity
          key={plan.id}
          style={[
            styles.planCard,
            selected === plan.id ? styles.selectedPlan : null,
          ]}
          onPress={() => setSelected(plan.id)}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planPrice}>{plan.price}</Text>
          </View>
          {plan.features.map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color={Theme.primary} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.payButton} onPress={() => {
        console.log('Selected Plan:', selected);
        // TODO: Razorpay call here
      }}>
        <Text style={styles.payText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: Theme.textDark,
  },
  planCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  selectedPlan: {
    borderColor: Theme.primary,
    backgroundColor: Theme.accentColor,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: Theme.textDark,
  },
  planPrice: {
    fontWeight: '600',
    fontSize: 16,
    color: Theme.primary,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 14,
    color: Theme.textDark,
  },
  payButton: {
    backgroundColor: Theme.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
