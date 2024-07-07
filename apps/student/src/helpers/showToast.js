import Toast from 'react-native-root-toast';
import theme from '../theme';

export const showErrorToast = (message) => {
    Toast.show(message , {
        duration: 3000,
        position: 75,
        animation: true,
        backgroundColor: theme.colors.error
      });
}

export const showSuccessToast = (message) => {
    Toast.show(message , {
        duration: 3000,
        position: 75,
        animation: true,
        backgroundColor: theme.colors.success
      });
}