import React from 'react';
import { Modal, FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

interface CustomDropdownProps {
    visible: boolean;
    data: string[];
    onSelect: (item: string) => void;
    onClose: () => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ visible, data, onSelect, onClose }) => (

    <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={onClose}>
            <View style={styles.dropdown}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </TouchableOpacity>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000055' },
    dropdown: { backgroundColor: 'white', borderRadius: 10, padding: 10, width: '80%' },
    item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
});

export default CustomDropdown;
