import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "pl",
  messages: {
    pl: {
      clearDate: "Resetuj datę",
      clearChartData: "Wyszczyść dane wykresu",
      selectRange: "Wybierz zakres dat",
      temperature: "Temperatura",
      pressure: "Ciśnienie",
      all: "Wszystkie",
      tableName: "Nazwa",
      tableValue: "Wartość",
      tableDate: "Data",
      values: "Wartości",
      date: "Data",
      cancel: "Anuluj",
      errorTitle: "Coś poszło nie tak!",
      errorMsgOne:
        "Przepraszamy, ale nie moegliśmy znaleźć strony, której szukasz.",
      errorMsgTwo: "Wprowadź poprawny adres lub wróć do poprzedniej strony.",
      errorBtn: "Powrót",
      homeTitle: "Witaj!",
      homeMsgOne:
        "Niniejsza aplikacja umożliwia użytkownikowi przeglądanie rekordów i wyświetlanie na wykresach wartości temperatury i ciśnienia urządzenia.",
      homeMsgTwo: "Aby przejść do sekcji analityki użyj przycisku poniżej.",
      homeBtn: "Do analityki",
      langSelector: "Wybierz język",
    },
    en: {
      clearDate: "Clear date",
      clearChartData: "Clear chart data",
      selectRange: "Select range of dates",
      temperature: "Temperature",
      pressure: "Pressure",
      all: "All",
      tableName: "Name",
      tableValue: "Value",
      tableDate: "Date",
      values: "Values",
      date: "Datetime",
      cancel: "Cancel",
      errorTitle: "Something went wrong!",
      errorMsgOne:
        "We're sorry, but the page you were looking for couldn't be found.",
      errorMsgTwo: "Provide correct URL or go back to your previous location.",
      errorBtn: "Go Back",
      homeTitle: "Welcome!",
      homeMsgOne:
        "This app provides user with ability to browse thourgh records and display device's temperature and pressure on charts.",
      homeMsgTwo:
        "To redirect to the analytics section of this app using button below.",
      homeBtn: "Go to analytics",
      langSelector: "Choose language",
    },
  },
});

export default i18n;
