import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Button, Picker,Dimensions  } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import firebase from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import DatePicker from 'react-native-datepicker'
import { LineChart,ProgressChart } from 'react-native-chart-kit'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  
    return (
        <View flex={1}>
          <DrawerContentScrollView {...props}>
                <View style={{marginTop: -10,width: 500,height: 100,backgroundColor: '#f26866',alignItems: 'flex-start', justifyContent: 'center'}}>
                    <Text style={{marginLeft: 15,fontSize: 20,color: '#fff'}}>Jay Kadiwala</Text>
                </View>
            <DrawerItem
                label="Home"
                onPress={()=>props.navigation.navigate('Home')}
            />
            <DrawerItem
                label="Analysis"
                onPress={()=>props.navigation.navigate('Analysis')}
            />
            <DrawerItem
              label="Logout"
                onPress={async() => {
                    await firebase.auth().signOut()
                    .then((result) => {
                      console.log(result)
                    })
                    .catch((error) => {
                      console.log(error)
                    })
              }}
            />
          </DrawerContentScrollView>
        </View>
    );
}
  
function HomeScreen({ navigation }) {
  const [openCategory, setOpenCategory] = useState(false)
  const [openExpense, setOpenExpense] = useState(false)
  const [category, setCategory] = useState('')
  const [categoryArray,setCategoryArray] = useState([])
  const [expense, setExpense] = useState('')
  const [expenseArray,setExpenseArray] = useState([])
  const [selectedValue, setSelectedValue] = useState("0")
  
  var currentDate = new Date().getDate()
  var currentMonth = new Date().getMonth() + 1
  var currentYear = new Date().getFullYear()
  var minDay = currentDate + 1
  var maxMonth = currentMonth + 1
  var minDate = String(minDay+'-'+currentMonth+'-'+currentYear)
  
  
  const [date, setDate] = useState()


  var value = 0

  useEffect(() => {
    getCategory()
    getExpense()
  },[])
  
  // console.log(firebase.auth().currentUser.uid)
  const getCategory = async () => {
    var userId = firebase.auth().currentUser.uid
    var data = []
    await firebase.firestore().collection('category').where('user_id', '==', userId).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        data.push(doc.data())
      })
    })
    setCategoryArray(data)
  }

  const addCategory = async () => {
    var userId = firebase.auth().currentUser.uid
    await firebase.firestore().collection('category').add({
      user_id: userId,
      category: category
    }).then(() => {
      getCategory()
    })
  }

  const addExpense = async () => {
    var userId = firebase.auth().currentUser.uid
    await firebase.firestore().collection('expense').add({
      user_id: userId,
      category: selectedValue,
      expense: expense,
      date: date
    }).then(() => {
      getExpense()
    })
  }

  const getExpense = async () => {
    var userId = firebase.auth().currentUser.uid
    var data = []
    await firebase.firestore().collection('expense').where('user_id', '==', userId).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        data.push(doc.data())
      })
    })
    setExpenseArray(data)
  }

  // var total = []
  // var grandTotal = 0
  // categories.forEach((c, keys) => {
  //   var sum = 0
  //   expenseArray.forEach((item, key) => {
  //     // console.log(item.category)
  //     if (c.category == item.category) {
  //       sum = sum + parseInt(item.expense)
  //     }
  //   })
  //   total.push({
  //     category: c.category,
  //     sum: sum
  //   })
  // })
  
  // var labels = []
  // var labelLength = total.length
  // var values = []

  // total.forEach((item, key) => {
  //   grandTotal = grandTotal + item.sum
  //   labels.push(item.category)
  // })

  // total.forEach((item, key) => {
  //   values.push(((item.sum)/grandTotal))
  // })

  // console.log(expenseArray)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start',backgroundColor: '#ececec'}}>
        <View style={{elevation: 2,width: '100%',height: 50,backgroundColor: '#f26866',flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center'}}>
            <TouchableOpacity style={{marginLeft: 15}} onPress={()=>navigation.toggleDrawer()}>
                <View style={{ width: 30, height: 2, backgroundColor: '#fff' }}></View>
                <View style={{marginTop: 7,width: 30,height: 2,backgroundColor: '#fff'}}></View>
                <View style={{marginTop: 7,width: 30,height: 2,backgroundColor: '#fff'}}></View> 
            </TouchableOpacity>
        </View>
        {/* <View> */}
            <View style={{ width: '95%',padding: 10,marginTop: 25,backgroundColor: '#fff',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',borderRadius: 7,elevation: 2}}>
              <View style={{flexDirection: 'row',width: '90%',alignItems: 'center',justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18}}>Add category</Text>
                <TouchableOpacity onPress={()=>setOpenCategory(!openCategory)} style={{width: 35,height:35,alignItems: 'center',justifyContent: 'center',backgroundColor: '#f26866',borderRadius: 50,padding:1}}>
                  <Text style={{color:'#fff',fontSize: 26,display: openCategory ? 'none' : 'flex'}}>+</Text>
                  <Text style={{color:'#fff',fontSize: 30,display: openCategory ? 'flex' : 'none'}}>-</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 25,flexDirection: 'column',width: '90%',display: openCategory ? 'flex' : 'none'}}>
                <TextInput onChangeText={(value)=>setCategory(value)} style={{width: 300,height: 50,borderWidth: 0,backgroundColor: '#ececec',borderRadius: 4,paddingLeft: 15}} placeholder="Category" />
                <TouchableOpacity
                  style={{ width: 200, marginTop: 15, borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f26866' }}
                  onPress={()=> addCategory()}
                >
                  <Text style={{ color: '#fff', fontSize: 18 }}>Add Category</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: '95%',padding: 10,marginTop: 25,backgroundColor: '#fff',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',borderRadius: 7,elevation: 2}}>
              <View style={{flexDirection: 'row',width: '90%',alignItems: 'center',justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18}}>Add Expense</Text>
                <TouchableOpacity onPress={()=>setOpenExpense(!openExpense)} style={{width: 35,height:35,alignItems: 'center',justifyContent: 'center',backgroundColor: '#f26866',borderRadius: 50,padding:1}}>
                  <Text style={{color:'#fff',fontSize: 26,display: openExpense ? 'none' : 'flex'}}>+</Text>
                  <Text style={{color:'#fff',fontSize: 30,display: openExpense ? 'flex' : 'none'}}>-</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 25,flexDirection: 'column',width: '90%',display: openExpense ? 'flex' : 'none'}}>
                <TextInput onChangeText={(value)=>setExpense(value)} keyboardType='numeric' style={{width: 300,height: 50,borderWidth: 0,backgroundColor: '#ececec',borderRadius: 4,paddingLeft: 15}} placeholder="Expense" />
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  {
                  categoryArray.map((x, key) => {
                    value += 1    
                      return (
                        <Picker.Item label={x.category} value={x.category} />
                      )  
                    })
                  }
                </Picker>
                <DatePicker
                  style={styles.datePicker}
                  date={date}
                  mode="date"
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  // iconComponent={<FontAwesome name="calendar" style={{position: 'absolute',left:20}} size={20} color={primaryColor} />}
                  customStyles={{
                      dateInput: {
                          marginLeft: 27,
                          borderWidth: 0
                      },
                      dateTouchBody: {
                          backgroundColor: '#ececec',
                          borderRadius: 5,
                      },
                  }}
                  onDateChange={(date) => {
                    setDate(date)
                  }}
                />
                <TouchableOpacity onPress={()=> addExpense()} style={{ width: 200, marginTop: 15, borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f26866' }}>
                  <Text style={{color:'#fff',fontSize: 18}}>Add Expense</Text>
                </TouchableOpacity>
              </View>
            </View>
          
            <View style={{ width: '95%',padding: 10,marginTop: 40,backgroundColor: '#fff',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',borderRadius: 7,elevation: 2}}>
              <View style={{ width: '100%',marginVertical: 5,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
                  <Text style={{fontSize: 18,fontWeight: 'bold'}}>Type</Text>
                  <Text style={{fontSize: 18,fontWeight: 'bold'}}>Money</Text>
                  <Text style={{fontSize: 18,fontWeight: 'bold'}}>Date</Text>
              </View>
          
              {
                expenseArray.map((x, key) => {
                  return (
                    <View style={{ width: '100%',marginVertical: 5,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
                      <Text style={{ fontSize: 14 }}>{ x.category }</Text>
                      <Text style={{ fontSize: 14 }}>{ x.expense }</Text>
                      <Text style={{ fontSize: 14 }}>{ x.date }</Text>
                    </View>
                  )  
                })
              }
            </View>
        
        {/* </View> */}
      </View>
    );
}

function AnalysisScreen({ navigation }) {

  const [categories,setCategories] = useState([])
  const [expenseArray, setExpenseArray] = useState([])
  const [mylabels, setLabels] = useState([])
  const [myvalues, setValues] = useState([])
  const [mytotal, setTotal] = useState([])
  const [mygrandTotal, setGrandTotal] = useState(0)
  const [displayGraph,setDisplayGraph] = useState(false)

  useEffect(() => {
    getCategory()
    getExpense()
  }, [])
  
  const getCategory = async () => {
    var userId = firebase.auth().currentUser.uid
    var data = []
    await firebase.firestore().collection('category').where('user_id', '==', userId).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        data.push(doc.data())
      })
    })
    setCategories(data)
  }

  const getExpense = async () => {
    var userId = firebase.auth().currentUser.uid
    var data = []
    await firebase.firestore().collection('expense').where('user_id', '==', userId).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        data.push(doc.data())
      })
    })
    setExpenseArray(data)
    getGraphData()
  }

  // console.log(expenseArray)
  
  const getGraphData = () => {
    var total = []
    var grandTotal = 0
    categories.forEach((c, keys) => {
      var sum = 0
      expenseArray.forEach((item, key) => {
        // console.log(item.category)
        if (c.category == item.category) {
          sum = sum + parseInt(item.expense)
        }
      })
      total.push({
        category: c.category,
        sum: sum
      })
    })

    var labels = []
    var labelLength = total.length
    var values = []

    total.forEach((item, key) => {
      grandTotal = grandTotal + item.sum
      labels.push(item.category)
    })

    var ans = 0
    total.forEach((item, key) => {
      // values.push(parseInt(((item.sum)/grandTotal).toFixed(1)))
      var tempSum = parseInt(item.sum)
      var tempGrandTotal = parseInt(grandTotal)
      ans = (tempSum / tempGrandTotal)
      values.push(ans)
      // console.log(typeof ans)
    })

    setLabels(labels)
    setValues(values)
    setTotal(total)
    setGrandTotal(grandTotal)

    setDisplayGraph(true)
  }

  const data = {
    labels: mylabels,
    data: myvalues
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={{elevation: 2,width: '100%',height: 50,backgroundColor: '#f26866',flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center'}}>
          <TouchableOpacity style={{marginLeft: 15}} onPress={()=>navigation.toggleDrawer()}>
            <View style={{ width: 30, height: 2, backgroundColor: '#fff' }}></View>
            <View style={{marginTop: 7,width: 30,height: 2,backgroundColor: '#fff'}}></View>
            <View style={{marginTop: 7,width: 30,height: 2,backgroundColor: '#fff'}}></View> 
          </TouchableOpacity>
      </View>
      <View style={styles.graphContainer}>
        {
          displayGraph &&
          <ProgressChart
            data={data}
            width={windowWidth/1.05}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0,166,90, ${opacity})`,
              style: {
                marginTop: 10,
                borderRadius: 16
              }
            }}
            hideLegend={false}
          />
        }
      </View>
    </View>
  );
}
  
const Home = ({ navigation }) => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Analysis" component={AnalysisScreen} />
        </Drawer.Navigator>
    )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    borderWidth: 0
  },
  graphContainer: {
    marginTop: 50,
    width: '95%',
    backgroundColor: '#f7f7f7',
    height: 220,
    elevation: 3
  }
});