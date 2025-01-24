import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import {Call, RouteSquare, Scroll, Share, Star1} from 'iconsax-react-native';

const LayoutDemo = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{padding: 16}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Flutter Layout Demo
        </Text>
      </View>
      <ScrollView>
        <View>
          <Image
            // source={{
            //   uri: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            // }}
            source={require('../assets/image1.jpg')}
            style={{
              width: Dimensions.get('window').width,
              height: 250,
            }}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column', padding: 20, gap: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column', gap: 8}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Oeschinen Lake Campground
              </Text>
              <Text style={{fontSize: 12, color: 'grey'}}>
                Kandersteg, Switzerland
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Star1 size="24" color="red" />
              <Text>41</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              paddingVertical: 16,
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <Call size="24" color="purple" />
              <Text>CALL</Text>
            </View>
            <View
              style={{flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <RouteSquare size="24" color="purple" />
              <Text>CALL</Text>
            </View>
            <View
              style={{flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <Share size="24" color="purple" />
              <Text>CALL</Text>
            </View>
          </View>
          <View>
            <Text>
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
              Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese
              Alps. Situated 1,578 meters above sea level, it is one of the
              larger Alpine Lakes. A gondola ride from Kandersteg, followed by a
              half-hour walk through pastures and pine forest, leads you to the
              lake, which warms to 20 degrees Celsius in the summer. Activities
              enjoyed here include rowing, and riding the summer toboggan run.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LayoutDemo;
