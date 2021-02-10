import axios from "axios";

class CollectionService {
    getAll() {
        return http.get('/collections');
    }

    get(id) {
        return http.get(`/collections/${id}`);
    }

    create(data) {
        return http.post('/collections', data);
    }

    update(id, data) {
        return http.put(`/collections/${id}`, data);
    }

    delete(id) {
        return http.delete(`/collections/${id}`);
    }

    findByName(name) {
        return http.get(`/collections?name=${name}`);
    }
}