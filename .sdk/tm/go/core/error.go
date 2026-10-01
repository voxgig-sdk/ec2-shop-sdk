package core

import "encoding/json"

type Ec2ShopError struct {
	IsEc2ShopError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
}

func NewEc2ShopError(code string, msg string, ctx *Context) *Ec2ShopError {
	return &Ec2ShopError{
		IsEc2ShopError: true,
		Sdk:                "Ec2Shop",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
	}
}

func (e *Ec2ShopError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *Ec2ShopError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *Ec2ShopError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
