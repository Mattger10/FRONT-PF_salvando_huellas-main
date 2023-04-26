// Traducimos los datos del back
export default function translateData (data){
    switch (data){
      case "puppy":
        return "Cachorro"
      case "adult":
        return "Adulto"
      case "old":
        return "Viejito"
      case "small":
        return "Pequeño"
      case "medium":
        return "Mediano"
      case "large":
        return "Grande"
      case "male":
        return "Macho"
      case "female":
        return "Hembra"
    }
  }