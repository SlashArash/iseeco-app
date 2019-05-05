export default {
  accountInformation: 'اطلاعات حساب',
  activeSensors: 'دستگاه‌های فعال',
  cinema: 'سینما',
  close: 'بستن',
  config: 'پیکربندی',
  cooling: 'سرمایش',
  device: 'دستگاه',
  devices: 'دستگاه‌ها',
  disconnectedFromServer: 'عدم اتصال به سرور',
  exit: 'خروج',
  guest: 'مهمان',
  home: 'خانه',
  informationLoading: 'در حال بارگیری اطلاعات',
  ipOfLocalServer: 'آی‌پی سرور محلی',
  smartHomeSystem: 'سامانه‌ی خانه‌ی هوشمند',
  loading: 'بارگیری...',
  noInternetConnection: 'اینترنت متصل نیست',
  normal: 'عادی',
  open: 'باز کردن',
  password: 'گذرواژه',
  pause: 'توقف',
  power: 'روشنایی',
  reconnect: 'اتصال دوباره',
  rooms: 'اتاق‌ها',
  roomType: (type: string) => {
    switch (type) {
      case 'kitchen':
        return 'آشپزخانه';
      case 'bedRoom':
        return 'اتاق خواب';
      case 'saloon':
        return 'سالن';
      case 'bath':
        return 'حمام';
      default:
        return 'اتاق';
    }
  },
  save: 'ذخیره',
  settings: 'تنظیمات',
  serverName: 'نام سرور',
  signOut: 'خروج از حساب',
  sleep: 'خواب',
  speed: 'سرعت',
  status: 'وضعیت',
  temperature: 'دمای جاری',
  travel: 'سفر',
  userName: 'نام کاربری',
  without: 'بدون',
};
