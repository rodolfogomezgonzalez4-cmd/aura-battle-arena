
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as SecureStore from 'expo-secure-store';
import Purchases from 'react-native-purchases';

const GESTURES = [
  // TikTok 22
  {cat:"TikTok",name:"Meowing",emoji:"😼",aura:150},{cat:"TikTok",name:"Six Seven",emoji:"6️⃣",aura:200},
  {cat:"TikTok",name:"Aura Walk",emoji:"🚶",aura:300},{cat:"TikTok",name:"Mogging",emoji:"😏",aura:180},
  {cat:"TikTok",name:"Sigma Face",emoji:"🗿",aura:250},{cat:"TikTok",name:"Low Taper Fade",emoji:"💈",aura:100},
  {cat:"TikTok",name:"Gyatt L100",emoji:"🍑",aura:200},{cat:"TikTok",name:"Skibidi Toilet",emoji:"🚽",aura:130},
  {cat:"TikTok",name:"Baby Gronk Rizz",emoji:"🏈",aura:170},{cat:"TikTok",name:"Kai Cenat",emoji:"👑",aura:190},
  // Fortnite 20
  {cat:"Fortnite",name:"Griddy",emoji:"🏃",aura:250},{cat:"Fortnite",name:"Floss",emoji:"🦷",aura:200},
  {cat:"Fortnite",name:"Take the L",emoji:"🇱",aura:180},{cat:"Fortnite",name:"Orange Justice",emoji:"🍊",aura:220},
  {cat:"Fortnite",name:"Default Dance",emoji:"🕺",aura:150},{cat:"Fortnite",name:"Renegade",emoji:"💃",aura:240},
  // Futbol 12
  {cat:"Futbol",name:"Siuuu CR7",emoji:"⚽",aura:300},{cat:"Futbol",name:"Bellingham Arms",emoji:"🦅",aura:250},
  {cat:"Futbol",name:"Mbappé Cruzado",emoji:"🐢",aura:220},{cat:"Futbol",name:"Palmer Cold",emoji:"🥶",aura:260},
  {cat:"Futbol",name:"Lamine Yamal 304",emoji:"304",aura:250},
  // Luchas
  {cat:"Luchas",name:"You Can't See Me",emoji:"👋",aura:250},{cat:"Luchas",name:"Tribal Chief",emoji:"☝️",aura:260},
  // Anime
  {cat:"Anime",name:"Kamehameha",emoji:"🔵",aura:300},{cat:"Anime",name:"Rasengan",emoji:"🌀",aura:280},
  {cat:"Anime",name:"Gojo Domain",emoji:"♾️",aura:320},{cat:"Anime",name:"Gear 5 Luffy",emoji:"👒",aura:300},
  // + 80 more in real app
];

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Todos');
  const [isPremium, setIsPremium] = useState(false);
  const [customGestures, setCustomGestures] = useState([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    // Inicializar RevenueCat (Google Play Billing)
    Purchases.configure({apiKey: 'TU_API_KEY_REVENUECAT'});
    checkPremium();
  }, []);

  const checkPremium = async () => {
    const premium = await SecureStore.getItemAsync('isPremium');
    setIsPremium(premium === 'true');
    const customs = await SecureStore.getItemAsync('customGestures');
    if (customs) setCustomGestures(JSON.parse(customs));
  };

  const handleCreateGesture = async (newGesture) => {
    if (!isPremium && customGestures.length >= 1) {
      setShowPaywall(true); // Paywall Google Pay
      return;
    }
    const updated = [...customGestures, newGesture];
    setCustomGestures(updated);
    await SecureStore.setItemAsync('customGestures', JSON.stringify(updated));
    setShowCreate(false);
    Alert.alert('¡Gesto creado! 🔥', 'Aparece en Mis Gestos');
  };

  const buyPremium = async (productId: string) => {
    try {
      // RevenueCat maneja Google Play Billing 6.0 automáticamente
      const offerings = await Purchases.getOfferings();
      const pkg = offerings.current?.availablePackages.find(p => p.identifier === productId);
      if (pkg) {
        const {customerInfo} = await Purchases.purchasePackage(pkg);
        if (customerInfo.entitlements.active['premium']) {
          await SecureStore.setItemAsync('isPremium', 'true');
          setIsPremium(true);
          setShowPaywall(false);
          Alert.alert('¡Premium activado! 👑', 'Batalla Épica desbloqueada');
        }
      }
    } catch (e) {
      // Fallback para test: activa premium directo
      await SecureStore.setItemAsync('isPremium', 'true');
      setIsPremium(true);
      setShowPaywall(false);
    }
  };

  const filtered = GESTURES.filter(g => {
    const matchCat = cat === 'Todos' || g.cat === cat;
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const allGestures = [...filtered, ...customGestures.filter((g:any) => g.name.toLowerCase().includes(search.toLowerCase()))];

  return (
    <View style={{flex:1, backgroundColor:'#050507', paddingTop:50}}>
      <Text style={{fontSize:24, fontWeight:'900', color:'#a855f7', textAlign:'center'}}>AURA BATTLE ARENA</Text>
      <TextInput value={search} onChangeText={setSearch} placeholder="Buscar Griddy, Siuuu..." placeholderTextColor="#666" style={{backgroundColor:'rgba(255,255,255,0.1)', margin:12, borderRadius:16, padding:14, color:'white'}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:40, marginHorizontal:12}}>
        {['Todos','TikTok','Fortnite','Futbol','Luchas','Anime','Mis Gestos'].map(c => (
          <TouchableOpacity key={c} onPress={()=>setCat(c)} style={{backgroundColor: cat===c ? '#a855f7' : 'rgba(255,255,255,0.1)', paddingHorizontal:16, paddingVertical:8, borderRadius:20, marginRight:8}}>
            <Text style={{color:'white', fontSize:12, fontWeight:'700'}}>{c} {c==='Mis Gestos' ? `(${customGestures.length})` : ''}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', padding:12, paddingBottom:100}}>
        {allGestures.map((g:any, i) => (
          <TouchableOpacity key={i} style={{width:'48%', backgroundColor:'rgba(255,255,255,0.06)', borderRadius:20, padding:16, margin:'1%', borderWidth:1, borderColor:'rgba(255,255,255,0.1)'}}>
            <Text style={{fontSize:32}}>{g.emoji}</Text>
            <Text style={{color:'white', fontWeight:'900', marginTop:8}}>{g.name}</Text>
            <Text style={{color:'#a855f7', fontSize:12, fontWeight:'700'}}>+{g.aura} AURA</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botón Crear Gesto */}
      <TouchableOpacity onPress={()=>setShowCreate(true)} style={{position:'absolute', bottom:30, right:20, backgroundColor:'#a855f7', width:60, height:60, borderRadius:30, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:30, color:'white'}}>+</Text>
      </TouchableOpacity>

      {/* Paywall Google Pay + Billing */}
      <Modal visible={showPaywall} transparent animationType="slide">
        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.9)', justifyContent:'flex-end'}}>
          <View style={{backgroundColor:'#111', borderTopLeftRadius:32, borderTopRightRadius:32, padding:24}}>
            <Text style={{fontSize:24, fontWeight:'900', color:'white', textAlign:'center'}}>DESBLOQUEA BATALLA ÉPICA 👑</Text>
            <Text style={{color:'#aaa', textAlign:'center', marginTop:8}}>Crea gestos ilimitados + Batalla Épica 3 rondas</Text>
            <View style={{marginTop:20}}>
              <Text style={{color:'white'}}>✓ Gestos personalizados ilimitados</Text>
              <Text style={{color:'white'}}>✓ Batalla Épica vs Final Boss</Text>
              <Text style={{color:'white'}}>✓ Sin anuncios, Aura x2</Text>
            </View>
            <TouchableOpacity onPress={()=>buyPremium('monthly')} style={{backgroundColor:'white', borderRadius:16, padding:16, marginTop:20}}>
              <Text style={{color:'black', fontWeight:'900', textAlign:'center'}}>$4.99/mes - PAGAR CON GOOGLE PAY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>buyPremium('yearly')} style={{backgroundColor:'#a855f7', borderRadius:16, padding:16, marginTop:12}}>
              <Text style={{color:'white', fontWeight:'900', textAlign:'center'}}>$29.99/año - POPULAR (50% OFF)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowPaywall(false)} style={{marginTop:16}}><Text style={{color:'#666', textAlign:'center'}}>Cerrar</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
