import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import EditIcon from './EditIcon';

interface InfoCardProps {
  title: string;
  data: { label: string; value: string }[];
  onSave: (updated: { [label: string]: string }) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, data, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<{ [label: string]: string }>(
    Object.fromEntries(data.map((item) => [item.label, item.value || '']))
  );

  const handleChange = (label: string, text: string) => {
    setValues({ ...values, [label]: text });
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(values);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <EditIcon onPress={() => setIsEditing(!isEditing)} />
      </View>
      <View style={styles.divider} />

      {Object.entries(values).map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => handleChange(label, text)}
              placeholder="Enter..."
              placeholderTextColor="#ec9a9a"
            />
          ) : (
            <Text style={styles.value}>{value || '—'}</Text>
          )}
        </View>
      ))}

      {isEditing && (
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdeaea',
    margin: 20,
    borderRadius: 16,
    paddingVertical: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#701111',
    fontFamily: 'Marmelad',
  },
  divider: {
    height: 2,
    backgroundColor: '#70111155',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Marmelad',
    fontSize: 14,
    color: '#701111',
    flex: 1,
  },
  value: {
    fontFamily: 'Marmelad',
    fontSize: 14,
    color: '#ec9a9a',
    textAlign: 'right',
    flex: 1,
  },
  input: {
    fontFamily: 'Marmelad',
    fontSize: 14,
    color: '#701111',
    borderBottomWidth: 1,
    borderColor: '#ec9a9a',
    paddingVertical: 2,
    textAlign: 'right',
    flex: 1,
  },
  saveBtn: {
    backgroundColor: '#701111',
    margin: 16,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Marmelad',
  },
});
