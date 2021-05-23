import {Dimensions,PixelRatio} from 'react-native';
const {width,height} = Dimensions.get('window')
const widthToDp =  widthNumber => {
    let mapwidth =
        typeof widthNumber === 'number' ? widthNumber : parseFloat(widthNumber);
        return PixelRatio.roundToNearestPixel(layoutSize = (width*mapwidth)/100);
        
};

//console.log(widthToDp)


const heightToDp =  number => {
    let mapheight =
        typeof number === 'number' ? number : parseFloat(number);
        return PixelRatio.roundToNearestPixel(layoutSize = (height*mapheight)/100);
};

//console.log(heightToDp)
export {widthToDp,heightToDp};