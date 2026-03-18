// ============================================
// WANDERLUST - SEED DE DATOS DE PRUEBA
// ============================================
// Uso: 
//   1. kubectl exec -it -n wanderlust <mongo-pod> -- mongosh
//   2. use wanderlust
//   3. load('/scripts/seed-db.js')
//   O copiar y pegar este contenido en mongosh
// ============================================

use wanderlust

// Limpiar datos existentes (opcional)
// db.posts.deleteMany({})

// Insertar posts (datos de prueba del proyecto)
db.posts.insertMany([
  {
    authorName: "Ema DevOps",
    title: "Mi viaje a Japón",
    imageLink: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    categories: ["Asia", "Cultura", "Tecnología"],
    description: "Una experiencia increíble por Tokio y Kyoto",
    isFeaturedPost: true,
    timeOfPost: new Date()
  },
  {
    authorName: "Ema DevOps",
    title: "Explorando Europa",
    imageLink: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&h=600&fit=crop",
    categories: ["Europa", "Historia", "Gastronomía"],
    description: "Recorrido por España, Francia e Italia",
    isFeaturedPost: true,
    timeOfPost: new Date()
  },
  {
    authorName: "Ema DevOps",
    title: "Aventura en Sudamérica",
    imageLink: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
    categories: ["América", "Aventura", "Naturaleza"],
    description: "Machu Picchu y más destinos increíbles",
    isFeaturedPost: false,
    timeOfPost: new Date()
  },
  {
    authorName: "Ema DevOps",
    title: "Turismo interno",
    imageLink: "https://statics.guiaturista.com.uy/2025/07/687904ff3e493.jpg",
    categories: ["Naturaleza", "Aventura", "Viajes"],
    description: "Uruguay profundo: El tesoro que tenía al lado. Siempre miramos hacia afuera, pero este viaje por el interior me demostró que no conocemos ni la mitad de lo que tenemos. Me mandé por caminos de tierra y descubrí quebradas vírgenes y pueblos donde el tiempo se olvidó de correr. Ni sabía que estos lugares existían, y estaban acá, a la vuelta de casa. Me volví con una certeza: Uruguay no es solo playa; el verdadero corazón del país late monte adentro. ¡Salgan a rutear, que nuestra tierra sorprende!",
    isFeaturedPost: false,
    timeOfPost: new Date()
  }
])

// Verificar inserción
print("=== POSTS INSERTADOS ===")
db.posts.find().forEach(doc => {
  print("Title: " + doc.title)
  print("imageLink: " + doc.imageLink)
  print("isFeaturedPost: " + doc.isFeaturedPost)
  print("---")
})

print("Total posts: " + db.posts.countDocuments({}))
print("Featured posts: " + db.posts.countDocuments({ isFeaturedPost: true }))
