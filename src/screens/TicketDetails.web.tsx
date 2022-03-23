import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Modal } from 'react-native';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import Button from '@fair/components/common/Button';
import { color } from '@fair/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import FTWebLayout from '@fair/components/custom/FTWebLayout/index.web';
import { useMediaQuery } from 'react-responsive';
import { useApi } from '@fair/hooks/useApi';
import RegisterModal from '@fair/components/custom/RegisterModal';
import LoginModal from '@fair/components/custom/LoginModal';

const reviews = [
  {
    id: 1, name: 'John Doe', country: 'France', ago: '2 weeks ago', description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_1.png'),
    rating: 4,
  },
  {
    id: 2, name: 'Joanna  Doe', country: 'Italy', ago: 'A month ago', description: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_2.png'),
    rating: 3,
  },
  {
    id: 3, name: 'John Doe', country: 'Croatia', ago: '2 weeks ago', description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_3.png'),
    rating: 5,
  },
  {
    id: 4, name: 'Joanna  Doe', country: 'Italy', ago: 'A month ago', description: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_2.png'),
    rating: 3,
  },
  {
    id: 5, name: 'John Doe', country: 'Croatia', ago: '2 weeks ago', description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_3.png'),
    rating: 5,
  },
  {
    id: 6, name: 'John Doe', country: 'France', ago: '2 weeks ago', description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_1.png'),
    rating: 4,
  },
  {
    id: 7, name: 'Joanna  Doe', country: 'Italy', ago: 'A month ago', description: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_2.png'),
    rating: 3,
  },
  {
    id: 8, name: 'John Doe', country: 'Croatia', ago: '2 weeks ago', description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_3.png'),
    rating: 5,
  },
  {
    id: 9, name: 'John Doe', country: 'Croatia', ago: '2 weeks ago', description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_3.png'),
    rating: 5,
  },
  {
    id: 10, name: 'Joanna  Doe', country: 'Italy', ago: 'A month ago', description: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_2.png'),
    rating: 3,
  },
  {
    id: 11, name: 'John Doe', country: 'Croatia', ago: '2 weeks ago', description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: require('../../assets/images/reviews_3.png'),
    rating: 5,
  },
];

export default function TicketDetailsScreen() {
  const md = useMediaQuery({ maxWidth: 1500 });
  const feature_cards_break = useMediaQuery({ maxWidth: 1350 });
  const xs = useMediaQuery({ maxWidth: 900 });
  const sm = useMediaQuery({ maxWidth: 1000 });
  const modal_xs = useMediaQuery({ maxWidth: 800 });
  const modal_xxs = useMediaQuery({ maxWidth: 650 });
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [winebars, setWinebars] = useState([])
  const [remeberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [restaurants, setRestaurants] = useState([])
  const [becomeTester, setBecomeTester] = useState({
    full_name: '',
    email: '',
    operating_system: '',
  })
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  })
  const [formRegister, setFormRegister] = useState({
    username: '',
    email: '',
    password: '',
  })

  const getWineBarsClose = async () => {
    const { data } = await useApi('featured/winebars')
    setWinebars(data)
  }
  const getRestaurantsClose = async () => {
    const { data } = await useApi('featured/restaurants')
    setRestaurants(data)
  }
  useEffect(() => {

    getWineBarsClose()
    getRestaurantsClose()

  }, [])

  const onFormValueChange = (field: any, value: any) => {
    setBecomeTester(d => ({ ...d, [field]: value }))
  }

  const onLoginFormValueChange = (field: any, value: any) => {
    setFormLogin(d => ({ ...d, [field]: value }))
  }

  const onRegisterFormValueChange = (field: any, value: any) => {
    setFormRegister(d => ({ ...d, [field]: value }))
  }

  const pageSize = 5;
  const totalPages = reviews && reviews.length > pageSize ? Math.ceil(reviews.length / pageSize) : 1;

  const getPages = () => {
    const data = [];
    for (let i = 0; i < totalPages; i++) {
      data.push(i + 1);
    }
    return data;
  }

  const pages = getPages();

  return (
    <FTWebLayout setShowSignInModal={setShowSignInModal}>
      <View>
        <View style={styles.heroContainer}>
          <View
            style={styles.linearGradient}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.lightContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.text} type='text'>
                Sed ut perspiciatis unde omnis iste natus error
              </Text>
              <Text style={styles.rightText} type='text'>07. - 08. May, Fri - Sat, 3pm - 11pm </Text>
              <View style={{ width: '100%', borderWidth: 1, height: 0, borderColor: '#E5E5E5', marginTop: 40 }} />
              <View style={{ marginTop: 40 }}>
                <Text style={styles.header} type='heading'>Ticket Details</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
                  <View style={{ width: modal_xxs ? '40%' : '33.33%' }}>
                    <Text style={styles.rightText} type='text'>General Admission </Text>
                  </View>
                  <View style={{ width: modal_xxs ? '30%' : '33.33%' }}>
                    <Text style={styles.rightText} type='text'>€20 </Text>
                  </View>
                  <View style={{ width: modal_xxs ? '30%' : '33.33%' }}>
                    <Picker
                      selectedValue={becomeTester['operating_system']}
                      style={[styles.becomeTesterInput, { width: 115 }]}
                      onValueChange={(itemValue, itemIndex) =>
                        onFormValueChange('operating_system', itemValue)
                      }>
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                      <Picker.Item label="4" value="4" />
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={{ width: '100%', borderWidth: 1, height: 0, borderColor: '#E5E5E5', marginTop: 40 }} />
              <View style={{ marginTop: 40 }}>
                <Text style={styles.header} type='heading'>Order Summary</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
                  <View style={{ width: modal_xxs ? '50%' : '33.33%' }}>
                    <Text style={styles.rightText} type='text'>2 x General Admission  </Text>
                  </View>
                  <View style={{ width: modal_xxs ? '50%' : '33.33%' }}>
                    <Text style={styles.rightText} type='text'>€40 </Text>
                  </View>
                  {!modal_xxs && <View style={{ width: '33.33%' }} />}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <View style={{ width: modal_xxs ? '50%' : '33.33%' }}>
                    <Text style={styles.rightText} type='text'>Fees </Text>
                  </View>
                  <View style={{ width: modal_xxs ? '50%' : '33.33%' }}>
                    <Text style={styles.rightText} type='text'>€2.64 </Text>
                  </View>
                  {!modal_xxs && <View style={{ width: '33.33%' }} />}
                </View>
              </View>
              <View style={{ width: '100%', borderWidth: 1, height: 0, borderColor: '#E5E5E5', marginTop: 40 }} />
              <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
                <TextInput
                  autoFocus
                  placeholder="Enter coupon code"
                  style={[styles.becomeTesterInput, { width: xs ? '60%' : sm ? '80%' : 350 }]}
                />
                <View style={{ marginLeft: 22, width: xs ? '40%' : sm && '20%' }}>
                  <View style={{ width: xs || sm ? '100%' : 200 }}><Button label="APPLY COUPON" gold /></View>
                </View>
              </View>
              <View style={{ width: '100%', borderWidth: 1, height: 0, borderColor: '#E5E5E5', marginTop: 15 }} />
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 25 }}>
                {!sm && <View style={{ width: '80%' }} />}
                <View style={{ width: sm ? '100%' : '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={[styles.header, { fontSize: 16 }]} type='text'>Total</Text>
                  <Text style={[styles.header, { fontSize: 16 }]} type='text'>€42.64</Text>
                </View>
              </View>
              <View style={{ width: '100%', borderWidth: 1, height: 0, borderColor: '#E5E5E5', marginTop: 25 }} />
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 25 }}>
                {!sm && <View style={{ width: '80%' }} />}
                <View style={{ width: sm ? '100%' : '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ width: '100%' }}>
                    <Button label="GO TO CHECKOUT" dark />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {showSignInModal &&
        <View style={[styles.centeredView, { left: modal_xxs ? '5%' : modal_xs ? '10%' : sm ? '20%' : feature_cards_break ? '25%' : md ? '30%' : '35%' }]}>
          <Modal
            animationType="slide"
            visible={showSignInModal}
            onRequestClose={() => {
            }}
          >
            <View style={styles.centeredView}>
              {showRegisterForm ? (
                <RegisterModal
                  onRegisterFormValueChange={onRegisterFormValueChange}
                  formRegister={formRegister}
                  agreeTerms={agreeTerms}
                  setAgreeTerms={setAgreeTerms}
                  setShowRegisterForm={setShowRegisterForm}
                  setShowSignInModal={setShowSignInModal}
                />
              ) : (
                <LoginModal
                  onLoginFormValueChange={onLoginFormValueChange}
                  formLogin={formLogin}
                  remeberMe={remeberMe}
                  setRememberMe={setRememberMe}
                  setShowRegisterForm={setShowRegisterForm}
                  setShowSignInModal={setShowSignInModal}
                />
              )}
            </View>
          </Modal>
        </View>}
    </FTWebLayout>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  searchBar: {
    margin: 0,
    padding: 32,
    paddingHorizontal: '8%',
    width: '100%',
    backgroundColor: '#821D39',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBarItemContainer: {
    flexDirection: 'column',
    width: '15%',
  },
  searchBarText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  searchBarTextInput: {
    marginTop: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    fontSize: 15,
    color: '#FFFFFF',
  },
  subscribeButton: {
    marginTop: 10,
    width: 150,
  },
  sharingOptions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  option1: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#71142D',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  option2: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#71142D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 1,
  },
  lightContainer: {
    backgroundColor: color.white,
    paddingVertical: 40,
    height: 'auto',
    marginTop: 40,
    paddingHorizontal: '8%',
    width: '100%',
  },
  lightContainerColumn: {
    backgroundColor: color.white,
    paddingVertical: 40,
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    width: '100%',
    overflow: 'scroll',

  },
  leftContainer: {
    width: '100%%',
  },
  rightContainer: {
    width: '30%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 26,
  },
  bulletsContainer: {
    marginTop: 16,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  bulletText: {
    fontSize: 16,
    marginLeft: 10,
  },
  rightHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightText: {
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 21,
  },
  mapContainer: {
    padding: 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 14,
    borderRadius: 5,
  },
  map: {
    width: 284,
    height: 160,
    borderRadius: 5,
  },
  mapCaption: {
    fontSize: 16,
    lineHeight: 21,
    color: '#821D39',
    width: 290,
  },
  peopleGoingContainer: {
    width: 290,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },
  peopleGoingImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#C4C4C4',
  },
  scroller: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  wineCatalogCard: {
    width: '100%',
    marginVertical: 25,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 16,
    right: 19,
  },
  bottleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  wineBottle: {
    width: 119,
    height: 215,
  },
  wineStain: {
    width: 107,
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  wineRating: {
    fontSize: 28,
    lineHeight: 33,
    color: '#71142D',
    fontWeight: 'bold'
  },
  wineRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    //flex: 1,
    height: 'auto'
  },
  scrollContainerContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto'
  },
  detailsContainer: {
    marginTop: 15,
  },
  caption: {
    fontSize: 14,
    color: '#777777',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    color: '#414141',
  },
  addressContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  address: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 16,
    color: '#414141',
  },
  darkContainer: {
    backgroundColor: color.lightGrey,
    paddingHorizontal: 40,
    paddingVertical: 40,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorView: {
    backgroundColor: color.white,
    height: 110,
    minWidth: 1110,
    marginTop: -55,
    padding: 20,
    borderRadius: 5,
  },
  selectorContainer: {
    alignItems: 'center'
  },
  background: {

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.15,
    shadowRadius: 50,

    elevation: 5,
    marginBottom: 30,
    borderRadius: 5
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30
  },
  featuredHeader: {
    color: color.black,
    fontFamily: brandFontFamily.h1,
    // fontSize: brandFontSize.h1,
    paddingVertical: 10
  },
  sectionHeader: {
    alignItems: 'center'
  },
  heroContainer: {
    position: "relative",
  },
  heroHeaderTextContainer: {
    marginTop: 100,
    marginBottom: 25,
    width: '85%',
  },
  heroHeaderContainer: {
    left: 0,
    top: 0,
    right: 0,
    bottom: "25%",
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 150,
    zIndex: 20
  },
  heroHeaderText: {
    fontSize: brandFontSize.hero,
    fontFamily: brandFontFamily.h1,
    color: "white",
    width: '100%',
  },
  heroHeaderSubText: {
    // fontSize: brandFontSize.h1,
    fontFamily: brandFontFamily.base,
    color: "white",
  },
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbsText: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
    color: '#FFFFFF',
  },
  heroDateText: {
    fontSize: brandFontSize.h1,
    fontFamily: brandFontFamily.base,
    color: "white",
    marginBottom: 30
  },
  linearGradient: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.55
  },
  gold: {
    color: color.gold
  },
  betaText: {
    color: color.text,
    fontSize: brandFontSize.h3,
    marginBottom: 40
  },
  introText: {
    color: color.text,
    fontSize: brandFontSize.h3,
    marginVertical: 5

  },
  column: {
    flex: 1,
    maxWidth: '25vh',
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  datePickerStyle: {
    width: '100%',
  },
  content: {
    //flexGrow: 1,
    //minHeight: '75vh'
  },
  mobileContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: color.light_gray
  },
  mobileHeader: {
    fontFamily: brandFontFamily.h1,
    fontSize: brandFontSize.h1
  },
  mobileText: {
    fontFamily: brandFontFamily.base,
    fontSize: brandFontSize.h2,
    justifyContent: 'center'
  },
  becomeTesterContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowRadius: 5,
    shadowColor: '#E5E5E5',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.5,
    padding: 30,
    alignItems: 'center',
  },
  fieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  becomeTesterInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F0F0F0',
    marginHorizontal: '2%',
    height: 45,
  },
  locationField: {
    marginBottom: '10px',
    borderRadius: 5,
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontSize: 18,
    borderWidth: 0,
    borderColor: '#E5E5E5'
  },
  centeredView: {
    position: 'absolute',
    top: 30,
    left: '35%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  headerDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
  },
  headerDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  headerDateSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    justifyContent: 'space-between',
    width: '100%',
  },
  locationText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDivider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '65%',
  }
});
