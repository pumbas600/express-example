// Reference: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

enum Status {
	// 2XX Success
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,

	// 3XX Redirection
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,

	// 4XX Client Errors
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,

	// 5XX Server Errors
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
}

export default Status;
