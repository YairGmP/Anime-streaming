export const GET = async (req) => {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint');
  
    if (!endpoint) {
      return new Response(JSON.stringify({ error: 'Parámetro "endpoint" requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  
    try {
      const apiUrl = `https://animeapi.skin/${endpoint}`;
      const response = await fetch(apiUrl, {
        headers: { 'x-requested-with': 'XMLHttpRequest' }
      });
      
      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };