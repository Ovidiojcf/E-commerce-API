<script setup>
import { Login } from '@/services/HttpService';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

async function clickLogin(params) {
    const result = await Login({ email: email.value, password: password.value})
    // 200 é o retorno positivo da api para a autenticação.
    if(result.status === 200){
        return 1;
    }else{
        alert('Login falhou');
    }
}
</script>