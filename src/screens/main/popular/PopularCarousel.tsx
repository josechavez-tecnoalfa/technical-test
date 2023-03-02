import React, { Component } from 'react'
import { StyleSheet, Platform, Pressable } from 'react-native'
import { ArrowBackIcon, ArrowForwardIcon, View } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { deviceWidth } from 'constants/dimensions'
// @ts-expect-error TS(7016) FIXME\
import Carousel, { Pagination } from 'react-native-snap-carousel'
class InnerCarousel extends Component {
  _carousel: any
  render () {
    return (
      <Carousel
        shouldOptimizeUpdates
        ref={(c: any) => {
          this._carousel = c
        }}
        {...this.props}
      />
    )
  }
}

type AdComponentProps = {
    item?: any;
    onNavigate?: any;
};

const AdComponent = ({ item, onNavigate }: AdComponentProps) => {
  return (
    <View style={styles.carouselContent}>

    </View>
  )
}

type PopularCarouselProps = {
    orders?: any;
    loading?: any;
    item?: any;
    toggleOverlay?: (...args: any[]) => any;
};

const PopularCarousel = (props: PopularCarouselProps) => {
  const { orders, toggleOverlay } = props
  const navigation = useNavigation()
  const [activeSlide, setActiveSlide] = React.useState(0)

  const carouselRef = React.useRef(null)

  const snapBack = () => {
    if (carouselRef?.current) {
      (carouselRef.current as any)?._carousel.snapToPrev()
    }
  }

  const snapForward = () => {
    if (carouselRef?.current) {
      (carouselRef.current as any)?._carousel.snapToNext()
    }
  }

  const onSnapUpdate = (index: any) => {
    if (typeof index === 'number') {
      setActiveSlide(index)
    }
  }

  const onNavigate = (item: any) => {
    if (item && item.active && item.id) {
      // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      navigation.navigate('Modals', {
        screen: 'MapsModal',
        params: {
          orderId: item.id
        }
      })

      // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      toggleOverlay()
    } else if (item && !item.active && item.id) {
      // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      navigation.navigate('Modals', {
        screen: 'TicketModal',
        params: {
          orderId: item.id
        }
      })

      // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      toggleOverlay()
    }
  }

  const MemoizedComponent = React.useMemo(() => AdComponent, [])

  return (
    <View style={styles.main}>
      <View style={styles.carouselContainer}>
        <InnerCarousel
          // @ts-expect-error TS(2769) FIXME: No overload matches this call.
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          data={orders || []}
          renderItem={({
            item
          }: any) => <MemoizedComponent item={item} onNavigate={onNavigate} />}
          hasParallaxImages={true}
          onSnapToItem={onSnapUpdate}
          ref={carouselRef}
        />
        {
          orders && orders.length > 1 &&
          <>
            <Pressable onPress={snapBack} style={[styles.arrowContainer, { left: 1 }]}>
              <ArrowBackIcon style={styles.arrowIcon}/>
            </Pressable>
            <Pressable onPress={snapForward} style={[styles.arrowContainer, { right: 1 }]} >
              <ArrowForwardIcon style={styles.arrowIcon} />
            </Pressable>
          </>
        }
      </View>
      <Pagination
        dotsLength={orders?.length < 10 ? orders.length : 0}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
  },
  carouselContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: '#1dbfa1',
    borderWidth: 1,
    alignSelf: 'center'
  },
  carouselContent: {
    maxWidth: '76%',
    alignContent: 'center',
    alignItems: 'center'
  },
  carouselTitle: {
    color: '#000'
  },
  carouselText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center'
  },
  carouselButton: {
    backgroundColor: '#1dbfa4',
    alignSelf: 'center',
    marginTop: 20
  },
  carouselButtonText: {
    fontSize: 12
  },
  carouselDismissText: {
    fontSize: 12,
    paddingVertical: 10,
    textDecorationLine: 'underline'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '2%',
    alignSelf: 'center'
  },
  ratingIcon: { color: '#1dbfa4', fontSize: 16 },
  arrowContainer: {
    zIndex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    opacity: 0.3,
    width: 40,
    height: 70,
    position: 'absolute',
    borderRadius: 5,
    top: 0
  },
  arrowIcon: {
    color: '#000',
    fontSize: 33,
    textAlign: 'center'
  },
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: '#1dbfa1'
  }
})

export default PopularCarousel
