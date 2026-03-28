# Gagarin Hack — сервис на Django + LLM

Проект для хакатона **Gagarin Hack**: бэкенд на **Django 4**, **DRF**, **PostgreSQL**, интеграции с **LangChain**, эмбеддинги (**sentence-transformers** / **PyTorch**), REST API со Swagger (**drf-yasg**).

## Возможности

- JWT-аутентификация (**djoser**, **simplejwt**)
- Работа с Yandex Cloud SDK
- ML/NLP-контур для обработки запросов (LangChain, scikit-learn)

## Запуск

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Фронтенд: каталог `frontend/` (см. `frontend/README.md`).

## Репозиторий

[github.com/Littump/gagarin_hack](https://github.com/Littump/gagarin_hack)
