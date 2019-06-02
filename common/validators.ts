export const validaCPF = (cpf: string): boolean => {
    let sum, rest

    if(cpf == undefined || cpf.trim().length === 0 || cpf === "00000000000"){
      return false
    }
    cpf = cpf.replace('.', '').replace('.', '').replace('-','')

    sum = 0
    for (let i=1; i<=9; i++) {
      sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
    }
    rest = (sum * 10) % 11

    if ((rest === 10) || (rest === 11)) {
      rest = 0
    }
    if (rest !== parseInt(cpf.substring(9, 10)) ) {
      return false
    }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
    }
    rest = (sum * 10) % 11

    if ((rest === 10) || (rest === 11))  {
      rest = 0
    }
    if (rest !== parseInt(cpf.substring(10, 11))) {
      return false
    }
    return true
}

export const getMoney = (valor: string): number =>{
  return parseInt( valor.replace(/[\D]+/g,'') )
}

export const formatReal = (valor: number): string =>{
    var tmp = valor +'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmp
}

export const formatDinheiro = (valor: number): string =>{
  return "R$ " + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
}