import 'react-native-url-polyfill/auto'
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

import { supabase } from '../lib/initSupabase'

import Main from './MainStack';
import Auth from './AuthStack';
import Account from '../screens/Account'
import Loading from '../screens/utils/Loading';




export default () => {
	const [session, setSession] = useState<Session | null>(null)
	useEffect(() => {
	console.log("it ran")
	setSession(supabase.auth.session())
	supabase.auth.onAuthStateChange((_event, session) => {
		setSession(session)
	  })
	}, [])

	const auth = useContext(AuthContext);
	const user = auth.user;
	return (
		<NavigationContainer>
			{session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
			{/* {user == null && <Loading />}
			{user == false && <Auth />}
			{user == true && <Main />} */}
			 {/* <Main /> */}
		</NavigationContainer>
	);
};
