import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    ScrollView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const SearchBarWithFilter = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [age, setAge] = useState(25);
    const [height, setHeight] = useState(5.5);
    const [weight, setWeight] = useState(65);

    const toggleFilter = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowFilter(!showFilter);
    };

    // Dropdown States
    const [openOcc, setOpenOcc] = useState(false);
    const [occupation, setOccupation] = useState(null);
    const [occupationItems, setOccupationItems] = useState([
        { label: 'Software Engineer / IT Professional', value: 'it' },
        { label: 'Government Employee (IAS/IPS/PCS etc.)', value: 'gov' },
        { label: 'Doctor (MBBS/MD etc.)', value: 'doctor' },
        { label: 'Business Owner / Entrepreneur', value: 'biz' },
        { label: 'Chartered Accountant', value: 'ca' },
        { label: 'Teacher / Professor', value: 'teacher' },
        { label: 'Lawyer / Advocate', value: 'lawyer' },
        { label: 'Bank Employee', value: 'bank' },
        { label: 'Civil Engineer / Architect', value: 'engineer' },
        { label: 'Working Abroad (USA, Canada, UAE)', value: 'abroad' },
    ]);

    const [openEdu, setOpenEdu] = useState(false);
    const [education, setEducation] = useState(null);
    const [educationItems, setEducationItems] = useState([
        { label: 'B.Tech / M.Tech', value: 'btech' },
        { label: 'MBBS / MD', value: 'mbbs' },
        { label: 'B.Com / M.Com', value: 'bcom' },
        { label: 'CA / CS / ICWA', value: 'ca' },
        { label: 'MBA / PGDM', value: 'mba' },
        { label: 'BA / MA', value: 'ba' },
        { label: 'PhD / Research Scholar', value: 'phd' },
        { label: 'LLB / LLM', value: 'law' },
        { label: 'B.Sc / M.Sc', value: 'bsc' },
        { label: 'International Degree', value: 'intl' },
    ]);

    const [openComp, setOpenComp] = useState(false);
    const [complexion, setComplexion] = useState(null);
    const [complexionItems, setComplexionItems] = useState([
        { label: 'Fair', value: 'fair' },
        { label: 'Wheatish', value: 'wheatish' },
        { label: 'Dusky', value: 'dusky' },
        { label: 'Very Fair', value: 'veryfair' },
        { label: 'Medium', value: 'medium' },
    ]);

    const applyFilters = () => {
        const filters = {
            age,
            height,
            weight,
            occupation,
            education,
            complexion,
        };

        console.log('Apply Filters: ', filters);
        setShowFilter(false); // 🔐 close the drawer
    };

    const resetFilters = () => {
        setAge(25);
        setHeight(5.5);
        setWeight(65);
        setOccupation(null);
        setEducation(null);
        setComplexion(null);
    };


    return (
        <>
            {/* Search Bar */}
            <View style={styles.wrapper}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search your perfect match!"
                        placeholderTextColor="#e15858"
                    />
                    <Feather name="search" size={20} color="#e15858" style={styles.searchIcon} />
                </View>

                <TouchableOpacity style={styles.filterBtn} onPress={toggleFilter}>
                    <Ionicons name="filter" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Filter Panel */}
            {showFilter && (
                <View style={styles.filterPanel}>
                    <ScrollView>
                        {/* Left Side: Sliders */}
                        <View style={styles.section}>
                            <Text style={styles.label}>Age</Text>
                            <Slider
                                minimumValue={18}
                                maximumValue={40}
                                step={1}
                                value={age}
                                onValueChange={setAge}
                                minimumTrackTintColor="#db5e5e"
                                maximumTrackTintColor="#fbcaca"
                            />
                            <Text style={styles.sliderText}>{age} Yrs</Text>

                            <Text style={styles.label}>Height</Text>
                            <Slider
                                minimumValue={4.5}
                                maximumValue={7}
                                step={0.1}
                                value={height}
                                onValueChange={setHeight}
                                minimumTrackTintColor="#db5e5e"
                                maximumTrackTintColor="#fbcaca"
                            />
                            <Text style={styles.sliderText}>{height.toFixed(1)} ft</Text>

                            <Text style={styles.label}>Weight</Text>
                            <Slider
                                minimumValue={40}
                                maximumValue={100}
                                step={1}
                                value={weight}
                                onValueChange={setWeight}
                                minimumTrackTintColor="#db5e5e"
                                maximumTrackTintColor="#fbcaca"
                            />
                            <Text style={styles.sliderText}>{weight} Kg</Text>
                        </View>

                        {/* Right Side: Dropdown inputs (static for now) */}
                        <View style={styles.section}>
                            <Text style={styles.label}>Occupation</Text>
                            <DropDownPicker
                                open={openOcc}
                                value={occupation}
                                items={occupationItems}
                                setOpen={setOpenOcc}
                                setValue={setOccupation}
                                setItems={setOccupationItems}
                                placeholder="Select Occupation"
                                style={styles.dropdown}
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={styles.dropdownBox}
                            />

                            <Text style={styles.label}>Academics</Text>
                            <DropDownPicker
                                open={openEdu}
                                value={education}
                                items={educationItems}
                                setOpen={setOpenEdu}
                                setValue={setEducation}
                                setItems={setEducationItems}
                                placeholder="Select Education"
                                style={styles.dropdown}
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={styles.dropdownBox}
                            />

                            <Text style={styles.label}>Complexion</Text>
                            <DropDownPicker
                                open={openComp}
                                value={complexion}
                                items={complexionItems}
                                setOpen={setOpenComp}
                                setValue={setComplexion}
                                setItems={setComplexionItems}
                                placeholder="Select Complexion"
                                style={styles.dropdown}
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={styles.dropdownBox}
                            />
                        </View>

                        <TouchableOpacity onPress={applyFilters} style={styles.applyBtn}>
                            <Text style={styles.applyText}>Apply Filters</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={resetFilters} style={styles.resetBtn}>
                            <Text style={styles.resetText}>Reset Filters</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            )}
        </>
    );
};

export default SearchBarWithFilter;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: '#db5e5e',
        paddingVertical: 10,
        paddingHorizontal: 16,
        elevation: 3,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Marmelad',
        color: '#701111',
    },
    searchIcon: {
        marginLeft: 8,
        alignSelf: 'center',
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e15858',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        elevation: 5,
    },
    filterPanel: {
        backgroundColor: '#fde3e3',
        marginHorizontal: 20,
        marginTop: 10,
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    section: {
        flex: 1,
    },
    label: {
        color: '#701111',
        fontSize: 14,
        fontFamily: 'Marmelad',
        marginTop: 10,
        marginBottom: 4,
    },
    sliderText: {
        color: '#701111',
        fontSize: 12,
        fontFamily: 'Marmelad',
        marginTop: -6,
    },
    dropdown: {
        borderColor: '#f5a5a5',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        zIndex: 1000,
    },
    dropdownText: {
        fontFamily: 'Marmelad',
        fontSize: 13,
        color: '#701111',
    },
    dropdownBox: {
        borderColor: '#f5a5a5',
        marginBottom: 10,
        zIndex: 500,
    },
    applyBtn: {
        backgroundColor: '#500202',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    applyText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Marmelad',
    },
    resetBtn: {
        backgroundColor: '#fdeaea',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 12,
        alignItems: 'center',
    },
    resetText: {
        color: '#db5e5e',
        fontSize: 14,
        fontFamily: 'Marmelad',
    },

});