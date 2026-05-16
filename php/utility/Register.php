<?php
declare(strict_types=1);

// Ec2Shop SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

Ec2ShopUtility::setRegistrar(function (Ec2ShopUtility $u): void {
    $u->clean = [Ec2ShopClean::class, 'call'];
    $u->done = [Ec2ShopDone::class, 'call'];
    $u->make_error = [Ec2ShopMakeError::class, 'call'];
    $u->feature_add = [Ec2ShopFeatureAdd::class, 'call'];
    $u->feature_hook = [Ec2ShopFeatureHook::class, 'call'];
    $u->feature_init = [Ec2ShopFeatureInit::class, 'call'];
    $u->fetcher = [Ec2ShopFetcher::class, 'call'];
    $u->make_fetch_def = [Ec2ShopMakeFetchDef::class, 'call'];
    $u->make_context = [Ec2ShopMakeContext::class, 'call'];
    $u->make_options = [Ec2ShopMakeOptions::class, 'call'];
    $u->make_request = [Ec2ShopMakeRequest::class, 'call'];
    $u->make_response = [Ec2ShopMakeResponse::class, 'call'];
    $u->make_result = [Ec2ShopMakeResult::class, 'call'];
    $u->make_point = [Ec2ShopMakePoint::class, 'call'];
    $u->make_spec = [Ec2ShopMakeSpec::class, 'call'];
    $u->make_url = [Ec2ShopMakeUrl::class, 'call'];
    $u->param = [Ec2ShopParam::class, 'call'];
    $u->prepare_auth = [Ec2ShopPrepareAuth::class, 'call'];
    $u->prepare_body = [Ec2ShopPrepareBody::class, 'call'];
    $u->prepare_headers = [Ec2ShopPrepareHeaders::class, 'call'];
    $u->prepare_method = [Ec2ShopPrepareMethod::class, 'call'];
    $u->prepare_params = [Ec2ShopPrepareParams::class, 'call'];
    $u->prepare_path = [Ec2ShopPreparePath::class, 'call'];
    $u->prepare_query = [Ec2ShopPrepareQuery::class, 'call'];
    $u->result_basic = [Ec2ShopResultBasic::class, 'call'];
    $u->result_body = [Ec2ShopResultBody::class, 'call'];
    $u->result_headers = [Ec2ShopResultHeaders::class, 'call'];
    $u->transform_request = [Ec2ShopTransformRequest::class, 'call'];
    $u->transform_response = [Ec2ShopTransformResponse::class, 'call'];
});
