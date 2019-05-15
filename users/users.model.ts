
const users =[
    { id: '1', name: 'Jaqueline Laurenti', email: 'jaquelinelaurenti@gmail.com'},
    {id: '2' , name: 'Gabi Laurenti', email: 'gabilaurenti@gmail.com'}
]
    
export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }    

    static findById(id: string): Promise<any>{
        return new Promise(resolve=>{
            const filtered = users.filter(user=> user.id == id)
            let user = undefined
            if(filtered.length > 0){
                user = filtered[0]
            }
            resolve(user)
        })
    }
}




/*
O mongoose ele tem uns objetos que precisaremos usar, ou seja o Schema, o mongo não obrigada seguir um Schema.
O ideal é quando temos uma colection é que agrupemos objetos dentro dessa colection que tenham objetos similares.
*/