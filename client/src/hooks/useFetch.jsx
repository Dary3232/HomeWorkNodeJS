export const useFetch = () => {
    const fetchData = async (url, method, body) => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (res.status !== 200) {
                const json = await res.json();
                alert(json.message);
                return null; 
            }

            return await res.json(); 
        } catch (e) {
            console.error(e);
            alert('Произошла ошибка при выполнении запроса');
            return null; 
        }
    };

    return { fetchData };
};


