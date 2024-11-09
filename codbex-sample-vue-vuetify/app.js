// Import your translations
import en from './locales/en.json' with { type: "json" };
import fr from './locales/fr.json' with { type: "json" };

// Define the messages for each language
const messages = {
    en,
    fr
};

const items = Vue.ref([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
])

const headers = [
    {
        title: 'Id',
        align: 'start',
        key: 'id',
    },
    {
        title: 'Name',
        align: 'start',
        key: 'name',
    },
    {
        title: 'e-mail',
        align: 'center',
        key: 'email',
    }
]

// Create the i18n instance with options
const i18n = VueI18n.createI18n({
    locale: 'en', // Set default language
    messages,     // Set locale messages
});

const app = Vue.createApp({
    data() {
        return {
            formData: {
                name: '',
                date: new Date(),
                gender: '',
                age: 18,
                agree: false,
                option: ''
            },
            locale: this.$i18n.locale,
            users: [], // For storing remote data
            items: items,
            headers: headers
        };
    },
    methods: {
        submitForm() {
            alert(JSON.stringify(this.formData));
        },
        // Method to fetch remote data
        async fetchRemoteData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                this.users = await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        changeLocale() {
            this.$i18n.locale = this.locale; // Switch language dynamically
        }
    },
    mounted() {
        // Fetch remote data when the component is mounted
        this.fetchRemoteData();
    }
});

const vuetify = Vuetify.createVuetify()

app.use(i18n);
app.use(vuetify);
app.mount('#app');
