package handlers

import (
	"net/http"

	"github.com/go-chi/render"
	"github.com/xAt0mZ/kdind/pkg/articles/types"
	"github.com/xAt0mZ/kdind/pkg/core/errors"
)

type ArticleRequest = types.ArticleRequest

var NewArticleResponse = types.NewArticleResponse

var ErrInvalidRequest = errors.ErrInvalidRequest

// CreateArticle persists the posted Article and returns it
// back to the client as an acknowledgement.
func CreateArticle(w http.ResponseWriter, r *http.Request) {
	data := &ArticleRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	article := data.Article
	dbNewArticle(article)

	render.Status(r, http.StatusCreated)
	render.Render(w, r, NewArticleResponse(article))
}
