const {Getapp}= require('../index');
const request =require('supertest');
const mongoose=require('mongoose')
describe("Pruebas unitarias",()=>{
    let app;
    const URLMONGO="mongodb+srv://admin:wSDGhlrxWDglTMpC@backend.voagjxh.mongodb.net/?retryWrites=true&w=majority"
    beforeAll(() => {
        app = Getapp()
        mongoose.connect(URLMONGO);
    })
    afterAll(() => {
        mongoose.connection.close()
    })
    // idtoken correcto
    test('/createresena',async ()=> {
        const resena={
            idtoken:'6387b7fb04d1abdbc54911a5',
            puntuacion:5,
            descripcion:'Es el mejor enjuage bucal'
        }
        const {status,_body:body} = await request(app).post('/api/resena/createresena/638251a6f98e2fbbe29a0de0/63839365ba97024beedefc4c')
        .send(resena)
        expect(status).toBe(200)
        expect(body.message).toBe('Se agrego correctamente la resena')
    })
    // create idtoken incorrecta
    test('/createresena',async ()=> {
        const resena={
            idtoken:'6387b7fb04d1abdbc54911a5',
            puntuacion:5,
            descripcion:'Es el mejor enjuage bucal'
        }
        const {status,_body:body} = await request(app).post('/api/resena/createresena/638251a6f98e2fbbe29a0de0/63839365ba97024beedefc4c')
        .send(resena)
        expect(status).toBe(404)
        expect(body.message).toBe('Credenciales incorrectas')
    })
    
    // Delete idtoken correcta
    test('/deleteresena',async ()=> {
        const user={
            idtoken:'6387b7fb04d1abdbc54911a5',
        }
        const {status,_body:body} = await request(app).delete('/api/deleteresena/6387b6d8f7ee9d12236a4bb6')
        .send(user)
        expect(body.message).toBe('Se eliminó correctamente la resena')
    })
    // Delete idtoken incorrecta
    test('/deleteresena',async ()=> {
        const user={
            idtoken:'6387b7fb04d1abdbc54911a4',
        }
        const {status,_body:body} = await request(app).delete('/api/deleteresena/638369b20e09f17dfab81b57')
        .send(user)
        expect(body.message).toBe('Credenciales incorrectas')
    })
    //Delete idresena incorrecto
    test('/deleteresena',async ()=> {
        const user={
            idtoken:'6387b7fb04d1abdbc54911a5',
        }
        const {status,_body:body} = await request(app).delete('/api/deleteresena/638369b20e09f17dfab81b58')
        .send(user)
        expect(body.message).toBe('No se encontro algún id')
    })
// Delete user idtoken correcto
    test('/deleteuser',async ()=> {
        const user={
            idtoken:'6387b7fb04d1abdbc54911a5',
        }
        const {_body:body} = await request(app).delete('/api/user/6387b82b04d1abdbc54911a8')
        .send(user)
        expect(body.message).toBe('Usuario eliminado correctamente')
    })
    // Delete user idtoken incorrecto
    test('/deleteuser',async ()=> {
        const user={
            idtoken:'6387b7fb04d1abdbc54911a4',
        }
        const {_body:body} = await request(app).delete('/api/user/6387b82b04d1abdbc54911a8')
        .send(user)
        expect(body.message).toBe('Credenciales Incorrectas')
    })
})
