package core

type Ec2ShopError struct {
	IsEc2ShopError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEc2ShopError(code string, msg string, ctx *Context) *Ec2ShopError {
	return &Ec2ShopError{
		IsEc2ShopError: true,
		Sdk:              "Ec2Shop",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Ec2ShopError) Error() string {
	return e.Msg
}
