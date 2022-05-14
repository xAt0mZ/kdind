package handlers

import (
	"net/http"

	"github.com/go-chi/render"
)

// SearchArticles searches the Articles data for a matching article.
// It's just a stub, but you get the idea.
func SearchArticles(w http.ResponseWriter, r *http.Request) {
	render.RenderList(w, r, NewArticleListResponse(articles))
}
