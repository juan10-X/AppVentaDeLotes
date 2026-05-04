export  const traslations={
    en:{
        // texto de login
        title:"Login",
        subtitle:"Lot sales application, Your secure lot",
        Email:"Email",
        pswd:"Password",
        btnLogin:"Login",
        register: "Don't have an account? Register here...",
        suport:"Can't access it? Contact us here.",
        // texto de login registro 
        Register:"Register:",
        iptNom:"Name",
        iptCor:"Email",
        iptCon:"Password",
        iptCel:"CellPhone",
        btnRegister:"Register User",
        Comeback:"Come back",
        // texto de login soporte de contraseña 
        titleSuport:"Click on any of our available        numbers:",
        msjbss:"Business hours 8:00am - 5:00pm.",
        Incharge:"In charge",


    },

    es:{
        // texto de login
        title:"Iniciar Sesion",
        subtitle:"Aplicativo de venta de Lotes, Tu lote seguro",
        Email:"correo",
        pswd:"contraseña",
        btnLogin:"Iniciar Sesion",
        register:"¿No tienes una cuenta?, Registrate aqui...",
        suport:"No puedes acceder?, Contactanos aqui.",
        // texto de login registro
        Register:"Registrate:",
        iptNom:"Nombre",
        iptCor:"Correo",
        iptCon:"Contraseña",
        iptCel:"Celular",
        btnRegister:"Registrar Usuario",
        Comeback:"Regresar",
        // texto de login soporte de contraseña 
        titleSuport:"Haz clik en cualquiera de nuestros numeros disponibles:",
        msjbss:"Horario de atencion 8:00am - 5:00pm.",
        Incharge:"Encargado",

    }
}

export type translationkeys=keyof typeof traslations.en;
export type Languages=keyof typeof traslations;