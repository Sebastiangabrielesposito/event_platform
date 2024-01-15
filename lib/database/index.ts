import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  return cached.conn;
}

// export const connectToDatabase = async () => {
//     try {
//       if (cached.conn) return cached.conn;
  
//       if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');
  
//       cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//         dbName: 'evently',
//         bufferCommands: false,
//       });
  
//       cached.conn = await cached.promise;
  
//       // Realiza una operación simple para probar la conexión (puedes ajustar esto según tu modelo)
//       const testQueryResult = await cached.conn.collection('tu_coleccion').findOne({});
  
//       console.log('Conexión a la base de datos establecida correctamente.');
//       console.log('Resultado de la prueba:', testQueryResult);
  
//       return cached.conn;
//     } catch (error) {
//       console.error('Error al intentar conectar a la base de datos:', error);
//       return null;
//     }
//   }

// mongoose.set("strictQuery", true);
// const connectToDatabase = async () => {
//     return new Promise<void>((resolve, reject) => {
//       mongoose.connect(MONGODB_URI as string, (error) => {
//         if (error) {
//           console.error('Error al conectar a la base de datos:', error);
//           reject(error);
//         } else {
//           console.log('Conectado a la base de datos');
//           resolve();
//         }
//       });
//     });
//   };


// mongodb+srv://ecommerce-Coder:46583954@coderdatabase.bwdyham.mongodb.net/?retryWrites=true&w=majority